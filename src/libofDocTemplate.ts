import JSZip from "jszip"
import { DocFile } from "./models/docFile";
import { TemplateVariableObject } from "./models/templateVariableObject";
import { LibofDocTemplateManagerService } from "./services/templateManagerService";
import { deepCopyTemplateVariableObject } from "./utils/variableUtils";

export class LibofDocTemplateImp {

    private variables: TemplateVariableObject = new Map()

    private contentFile = 'content.xml';
    private manifestFile = 'META-INF/manifest.xml'

    addVariable(name:string, value: string | TemplateVariableObject[] | Blob){
        this.variables.set(name, value)
    }

    async applyTemplateFromAssetsDocAndDownload(docPath:string){
        const blob = await this.applyTemplateFromAssetsDoc(docPath)
        await this.downloadBlob(blob)
    }

    async applyTemplateFromBufferAndDownload(docBuffer: ArrayBuffer) {
        const blob = await this.applyTemplateFromBuffer(docBuffer)
        await this.downloadBlob(blob)
    }

    async applyTemplateFromAssetsDoc(docPath: string){
        const response = await fetch(docPath);
        const zipData = await response.arrayBuffer();
        return await this.applyTemplateFromBuffer(zipData)
    }

    async applyTemplateFromBuffer(docBuffer: ArrayBuffer)  {
        const files:DocFile[] = await this.getFilesFromBuffer(docBuffer)
        const fileContent = this.getDocFileContent(files)
        const fileContentApply = await LibofDocTemplateManagerService.applyTemplate(fileContent, deepCopyTemplateVariableObject(this.variables))
        const fileContentApplyWithStyles = this.applyStylesToContent(fileContentApply)
        const manifest = this.getDocManifest(files)
        const applyManifest = this.applyImagesToManifest(manifest)
        const newFiles = this.updateDocumentFiles(files, fileContentApplyWithStyles, applyManifest)
        const fileBlob = await this.getDocumentBlobFromFiles(newFiles)
        //Limpiamos las imágenes del servicio
        LibofDocTemplateManagerService.clearImages()
        return fileBlob
    }

    private async downloadBlob(blob:Blob){
        const url = URL.createObjectURL(blob);

        // Crear un enlace de descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = new Date().toDateString() + '.odt';

        // Simular un clic en el enlace para iniciar la descarga
        a.click();

        // Limpiar la URL del objeto después de la descarga
        URL.revokeObjectURL(url);
    }

    private async getFilesFromBuffer(docBuffer: ArrayBuffer){
        const zip = new JSZip();
        const unzipped =  await zip.loadAsync(docBuffer);
        const filesPromise = Object.keys(unzipped.files).map(async filename => {
            const fileContent = await unzipped.files[filename].async('text'); 
            return {
                name: filename,
                content: fileContent
            }
        })
        return await Promise.all(filesPromise)
    }

    private getDocFileContent(files:DocFile[]){
        return files.find(file => file.name === this.contentFile)?.content!
    }

    private getDocManifest(files:DocFile[]){
        return files.find(file => file.name === this.manifestFile)?.content!
    }

    private updateDocumentFiles(files:DocFile[], newFileContent:string, newManifest:string){
        return files.map(file => {
            if (file.name === this.contentFile){
                file.content = newFileContent
            }

            if (file.name === this.manifestFile){
                file.content = newManifest
            }
            return file
        })
    }

    private async getDocumentBlobFromFiles(files:DocFile[]){
         const zip = new JSZip();
         files.forEach(file => {
            zip.file(file.name, file.content);
        });

        const imagesBase64Promise = LibofDocTemplateManagerService.getImages().map(async image => {
            const base64 = await image.getImageBase64()
            zip.file(image.zipUri, base64.split(",")[1], { base64: true });
        }) 
        await Promise.all(imagesBase64Promise)

        return await zip.generateAsync({ type: 'blob' })
    }

    private applyStylesToContent(fileContent:string){
        const stylesTag = '<office:automatic-styles>'
        const images = LibofDocTemplateManagerService.getImages()

        let newFileContent = fileContent

        images.forEach(image => {
            let fileContentApply = newFileContent.replace(stylesTag, stylesTag + ' ' + image.getODTStyle())
            newFileContent = fileContentApply
        })

        return newFileContent
    }

    
    private applyImagesToManifest(manifest:string){
        const manifestEndTag = '</manifest:manifest>'
        const images = LibofDocTemplateManagerService.getImages()

        let newManifest = manifest

        images.forEach(image => {
            let fileContentApply = newManifest.replace(manifestEndTag, image.getManifestEntry() + ' ' + manifestEndTag)
            newManifest = fileContentApply
        })

        return newManifest
    }

}