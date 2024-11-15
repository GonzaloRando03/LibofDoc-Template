export function removeSpacesInRange(text: string, startIndex: number, endIndex: number): string {
    if (startIndex < 0 || endIndex > text.length || startIndex >= endIndex) {
      throw new Error("Índices fuera del rango o inválidos.");
    }
    const beforeRange = text.substring(0, startIndex);
    const range = text.substring(startIndex, endIndex).replace(/\s+/g, '');
    const afterRange = text.substring(endIndex);
    return beforeRange + range + afterRange;
}

export function concatenateString(text:string, concat:string){
    let lineaConcatenar = concat.replace(/<[^>]+>/g, '');
    if (lineaConcatenar.endsWith(' in')) lineaConcatenar += ' '
    if (lineaConcatenar.startsWith('in ')) lineaConcatenar = ' ' + lineaConcatenar
    return text += lineaConcatenar
}

export function removeLineBreaks(text: string): string {
  return text.replace(/[\r\n]+/g, ''); 
}

export function formatXml(xmlString: string): string {
  let formatted = '';
  const reg = /(>)(<)(\/*)/g;
  xmlString = xmlString.replace(reg, '$1\r\n$2$3');
  let pad = 0;

  // Dividimos el XML en líneas usando '\r\n'
  const nodes = xmlString.split('\r\n');

  nodes.forEach((node) => {
      let indent = 0;

      // Verificamos si es una línea de cierre y de apertura
      if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
      } else if (node.match(/^<\/\w/)) {
          // Línea de cierre
          if (pad !== 0) {
              pad -= 1;
          }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          // Línea de apertura
          indent = 1;
      } else {
          indent = 0;
      }

      // Generamos el padding (sangría) usando espacios
      const padding = '  '.repeat(pad);

      // Agregamos la línea formateada al resultado
      formatted += padding + node + '\r\n';
      pad += indent;
  });

  return formatted;
}