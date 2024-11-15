import { concatenateString, removeSpacesInRange } from "./stringUtils"
import { endCommand, variableCommand } from "./templateComands"

export function getVariableName(line:string){
    let startIndex = line.indexOf(variableCommand)
    let endIndex = line.indexOf(endCommand, startIndex)

    const lineWithoutSpaces = removeSpacesInRange(line, startIndex, endIndex)
    const variableLine = lineWithoutSpaces.substring(startIndex, endIndex)
    
    startIndex = variableLine.indexOf('=')

    return variableLine.substring(startIndex , endIndex - 1)
        .replace('=', '')
        .replace(']', '')
        .replace(' ', '')
}


export function cleanLdtTags(lines: string[]): string[] {
    let insideLdt = false;
    let concatenatedText = '';
    let startTag = '';
    let endTag = '';
    let resultLines: string[] = [];

    lines.forEach(line => {
        if (line.includes('[!ldt') && !line.includes(']')) {
            // Detectar la etiqueta de apertura
            startTag = line.match(/<[^>]+>/)?.[0] || '<text:span>';
            endTag = line.match(/<\/[^>]+>/)?.[0] || '</text:span>';
            insideLdt = true;
            // Iniciar concatenación eliminando etiquetas HTML/XML
            concatenatedText = concatenateString(concatenatedText, line)
        } else if (insideLdt) {
            if (line.includes(']') && !line.includes('[!ldt')) {
                // Encontrar el cierre de ], concatenar texto y añadir la etiqueta de cierre
                concatenatedText = concatenateString(concatenatedText, line)
                resultLines.push(`${startTag}${concatenatedText}${endTag}`);
                concatenatedText = ''
                insideLdt = false;
            } else {
                // Continuar concatenando el texto dentro de [!ldt
                concatenatedText = concatenateString(concatenatedText, line)
            }
        } else {
            // Si no estamos dentro de [!ldt, añadir la línea tal cual
            resultLines.push(line);
        }
    });

    return resultLines;
}

export function mergeLdtsInXml(xmlString:string) {
    // Expresión regular para buscar bloques que empiezan con "[!ldt" y terminan con "]"
    const regex = /\[!l.*?\]/g;

    // Reemplazar cada coincidencia del regex y eliminar las etiquetas intermedias
    const processedXml = xmlString.replace(regex, (match) => match.replace(/<\/?[^>]+(>|$)/g, ''));

    return processedXml;
}