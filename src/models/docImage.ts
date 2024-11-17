export class DocImage {
    id:string
    width:number
    height:number
    blob:Blob
    imageType:string
    zipUri:string

    constructor(
        id:string,
        width:number,
        height:number,
        blob:Blob,
        imageType:string,
    ){
        this.id = id
        this.width = width ?? 100
        this.height = height ?? 100
        this.blob = blob
        this.imageType = imageType
        this.zipUri = 'Pictures/' + this.id + '.' + this.imageType.toLocaleLowerCase()
    }

     getODTValue(): string {
        return `<text:p text:style-name="${this.id}">
            <draw:frame draw:style-name="${this.id}Image" draw:name="${this.id}" text:anchor-type="char" svg:width="${this.width / 10}cm" svg:height="${this.height / 10}cm" draw:z-index="0">
                <draw:image xlink:href="${this.zipUri}" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:mime-type="image/${this.imageType}"/>
            </draw:frame>
        </text:p>`
    }

     getODTStyle(): string {
        return `<style:style style:name="${this.id}" style:family="paragraph" style:parent-style-name="Standard">
            <style:text-properties style:font-name="Arial" officeooo:rsid="001811ca" officeooo:paragraph-rsid="001811ca"/>
        </style:style>
        <style:style style:name="${this.id}Image" style:family="graphic" style:parent-style-name="Graphics">
            <style:graphic-properties style:horizontal-pos="center" style:horizontal-rel="paragraph" style:mirror="none" fo:clip="rect(0cm, 0cm, 0cm, 0cm)" draw:luminance="0%" draw:contrast="0%" draw:red="0%" draw:green="0%" draw:blue="0%" draw:gamma="100%" draw:color-inversion="false" draw:image-opacity="100%" draw:color-mode="standard"/>
        </style:style>`
    }

    getManifestEntry() {
        return ` <manifest:file-entry manifest:full-path="${this.zipUri}" manifest:media-type="image/${this.imageType}"/>`
    }
    


    static async fromBlob(imageBlob:Blob): Promise<DocImage> {
        const data = await this.getImageDetails(imageBlob)
        const imageId = new Date().getMilliseconds().toString()
        return new DocImage(imageId, data.width, data.height, imageBlob, data.extension)
    }

      async getImageBase64(): Promise<string>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            // Manejar el evento onload para obtener el resultado en Base64
            reader.onloadend = () => {
                const base64String = reader.result as string;
                resolve(base64String);
            };
    
            // Manejar errores al leer el Blob
            reader.onerror = () => reject(new Error("No se pudo convertir el Blob a Base64"));
    
            // Leer el Blob como una cadena Base64
            reader.readAsDataURL(this.blob);
        });
    }

    private static async getImageDetails(blob: Blob) {
        return new Promise<{ width: number; height: number; extension: string }>((resolve, reject) => {
            // Crear un URL para el Blob
            const url = URL.createObjectURL(blob);
    
            // Crear un elemento Image
            const img = new Image();
    
            // Manejar el evento onload para obtener el ancho y alto
            img.onload = () => {
                const width = img.width;
                const height = img.height;
    
                // Obtener la extensión del archivo a partir del tipo MIME
                const mimeType = blob.type;
                const extension = mimeType.split('/')[1];
                console.log('la extensión es: ', extension)
    
                // Liberar el URL creado
                URL.revokeObjectURL(url);
    
                // Resolver la promesa con los detalles de la imagen
                resolve({ width, height, extension });
            };
    
            // Manejar errores al cargar la imagen
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('No se pudo cargar la imagen'));
            };
    
            // Asignar el URL al src de la imagen
            img.src = url;
        });
    }
}

