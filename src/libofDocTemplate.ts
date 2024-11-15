import JSZip from "jszip"
import { DocFile } from "./models/docFile";
import { TemplateVariableObject } from "./models/templateVariableObject";
import { LibofDocTemplateManagerService } from "./services/libofDocTemplateManagerService";

class LibofDocTemplateImp {

    private contentFile = 'content.xml';

    applyTemplate(file:string){
        return LibofDocTemplateManagerService.applyTemplate(file)
    }

    async applyTemplateFromAssetsDoc(docPath: string){
        const response = await fetch(docPath);
        const zipData = await response.arrayBuffer();
        return await this.applyTemplateFromBuffer(zipData)
    }

    async applyTemplateFromBuffer(docBuffer: ArrayBuffer)  {
        const files:DocFile[] = await this.getFilesFromBuffer(docBuffer)
        const fileContent = this.getDocFileContent(files)
        console.log('el filecontent es: ', fileContent)
        const fileContentAppy = LibofDocTemplateManagerService.applyTemplate(fileContent)
        const newFiles = this.updateFileContent(files, fileContentAppy)
        const fileBlob = await this.getDocumentBlobFromFiles(newFiles)
        return fileBlob
    }

    addVariable(name:string, value: string | TemplateVariableObject[]){
        LibofDocTemplateManagerService.addVariable(name, value)
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

    private updateFileContent(files:DocFile[], newFileContent:string){
        return files.map(file => {
            if (file.name === this.contentFile){
                file.content = newFileContent
            }
            return file
        })
    }

    private async getDocumentBlobFromFiles(files:DocFile[]){
         const zip = new JSZip();
         files.forEach(file => {
            zip.file(file.name, file.content);
        });

        return await zip.generateAsync({ type: 'blob' })
    }


}

export const LibofDocTemplate = new LibofDocTemplateImp()