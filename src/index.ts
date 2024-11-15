


import { LibofDocTemplate } from './libofDocTemplate';
import { TemplateVariableObject } from './models/templateVariableObject';



const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:ooo="http://openoffice.org/2004/office" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:rpt="http://openoffice.org/2005/report" xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0" xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0" xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:number="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0" xmlns:ooow="http://openoffice.org/2004/writer" xmlns:oooc="http://openoffice.org/2004/calc" xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2" xmlns:xforms="http://www.w3.org/2002/xforms" xmlns:tableooo="http://openoffice.org/2009/table" xmlns:calcext="urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0" xmlns:drawooo="http://openoffice.org/2010/draw" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:loext="urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0" xmlns:field="urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0" xmlns:math="http://www.w3.org/1998/Math/MathML" xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0" xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0" xmlns:formx="urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0" xmlns:dom="http://www.w3.org/2001/xml-events" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:grddl="http://www.w3.org/2003/g/data-view#" xmlns:css3t="http://www.w3.org/TR/css3-text/" xmlns:officeooo="http://openoffice.org/2009/office" office:version="1.3"><office:scripts/><office:font-face-decls><style:font-face style:name="Arial" svg:font-family="Arial" style:font-family-generic="system" style:font-pitch="variable"/><style:font-face style:name="Liberation Sans" svg:font-family="&apos;Liberation Sans&apos;" style:font-family-generic="swiss" style:font-pitch="variable"/><style:font-face style:name="Liberation Serif" svg:font-family="&apos;Liberation Serif&apos;" style:font-family-generic="roman" style:font-pitch="variable"/><style:font-face style:name="Microsoft YaHei" svg:font-family="&apos;Microsoft YaHei&apos;" style:font-family-generic="system" style:font-pitch="variable"/><style:font-face style:name="Segoe UI" svg:font-family="&apos;Segoe UI&apos;" style:font-family-generic="system" style:font-pitch="variable"/><style:font-face style:name="Tahoma" svg:font-family="Tahoma" style:font-family-generic="system" style:font-pitch="variable"/></office:font-face-decls><office:automatic-styles><style:style style:name="P1" style:family="paragraph" style:parent-style-name="Text_20_body"><style:text-properties fo:color="#0000ff" loext:opacity="100%"/></style:style><style:style style:name="P2" style:family="paragraph" style:parent-style-name="Title"><style:text-properties fo:color="#0000ff" loext:opacity="100%"/></style:style><style:style style:name="P3" style:family="paragraph" style:parent-style-name="Text_20_body"><style:text-properties fo:color="#000000" loext:opacity="100%" fo:font-weight="normal" officeooo:rsid="00192fed" officeooo:paragraph-rsid="00192fed" style:font-weight-asian="normal" style:font-weight-complex="normal"/></style:style><style:style style:name="T1" style:family="text"><style:text-properties officeooo:rsid="0017dce1"/></style:style><style:style style:name="T2" style:family="text"><style:text-properties fo:color="#00ff7f" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="bold" officeooo:rsid="0017dce1" style:font-size-asian="15pt" style:font-weight-asian="bold" style:font-size-complex="15pt" style:font-weight-complex="bold"/></style:style><style:style style:name="T3" style:family="text"><style:text-properties fo:color="#228b22" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="bold" officeooo:rsid="0017dce1" style:font-size-asian="15pt" style:font-weight-asian="bold" style:font-size-complex="15pt" style:font-weight-complex="bold"/></style:style><style:style style:name="T4" style:family="text"><style:text-properties fo:color="#228b22" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="bold" officeooo:rsid="00192fed" style:font-size-asian="15pt" style:font-weight-asian="bold" style:font-size-complex="15pt" style:font-weight-complex="bold"/></style:style><style:style style:name="T5" style:family="text"><style:text-properties fo:color="#000000" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="bold" officeooo:rsid="0017dce1" style:font-size-asian="15pt" style:font-weight-asian="bold" style:font-size-complex="15pt" style:font-weight-complex="bold"/></style:style><style:style style:name="T6" style:family="text"><style:text-properties fo:color="#000000" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="normal" officeooo:rsid="0017dce1" style:font-size-asian="15pt" style:font-weight-asian="normal" style:font-size-complex="15pt" style:font-weight-complex="normal"/></style:style><style:style style:name="T7" style:family="text"><style:text-properties fo:color="#000000" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="normal" officeooo:rsid="00192fed" style:font-size-asian="15pt" style:font-weight-asian="normal" style:font-size-complex="15pt" style:font-weight-complex="normal"/></style:style><style:style style:name="T8" style:family="text"><style:text-properties fo:color="#000000" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="normal" officeooo:rsid="001a670c" style:font-size-asian="15pt" style:font-weight-asian="normal" style:font-size-complex="15pt" style:font-weight-complex="normal"/></style:style><style:style style:name="T9" style:family="text"><style:text-properties fo:color="#ff0000" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="normal" officeooo:rsid="0017dce1" style:font-size-asian="15pt" style:font-weight-asian="normal" style:font-size-complex="15pt" style:font-weight-complex="normal"/></style:style><style:style style:name="T10" style:family="text"><style:text-properties fo:color="#ff0000" loext:opacity="100%" fo:font-size="15pt" fo:font-weight="normal" officeooo:rsid="00192fed" style:font-size-asian="15pt" style:font-weight-asian="normal" style:font-size-complex="15pt" style:font-weight-complex="normal"/></style:style></office:automatic-styles><office:body><office:text><text:sequence-decls><text:sequence-decl text:display-outline-level="0" text:name="Illustration"/><text:sequence-decl text:display-outline-level="0" text:name="Table"/><text:sequence-decl text:display-outline-level="0" text:name="Text"/><text:sequence-decl text:display-outline-level="0" text:name="Drawing"/><text:sequence-decl text:display-outline-level="0" text:name="Figure"/></text:sequence-decls><text:p text:style-name="P2">[!l<text:span text:style-name="T1">d</text:span>t var=titulo1]</text:p><text:p text:style-name="P1"/><text:p text:style-name="Standard">[!ldt for=element in list1]</text:p><text:p text:style-name="Standard"><text:span text:style-name="T3">[!ldt var=</text:span><text:span text:style-name="T4">element.</text:span><text:span text:style-name="T3">key]</text:span><text:span text:style-name="T2"> </text:span><text:span text:style-name="T5">: </text:span>[!ldt var=element.value]</text:p><text:p text:style-name="Standard">[!ldt for=subelement in element.list2]</text:p><text:p text:style-name="Standard"><text:span text:style-name="T9">[!ldt var=</text:span><text:span text:style-name="T10">sub</text:span><text:span text:style-name="T9">element</text:span><text:span text:style-name="T10">.text</text:span><text:span text:style-name="T9">] - </text:span>[!ldt var=element.name]</text:p><text:p text:style-name="Standard">[!ldt end=element.list2]</text:p><text:p text:style-name="P3"/><text:p text:style-name="Standard">[!ldt end=list1]</text:p></office:text></office:body></office:document-content>`

const LibofDocTemplateService = LibofDocTemplate

LibofDocTemplateService.addVariable('titulo1', 'Este es el titulo 1')

LibofDocTemplateService.addVariable('list1', [
    new TemplateVariableObject([
        ['key', 'clave uno'],
        ['value', 'valor del map numero uno'],
        ['name', 'nombre elemento 1'],
        ['list2', 
            [/* new Map<string, string | TempateVariableObject[]>([
                ['text', 'texto del segundo map 1 uno']
            ]),
            new Map<string, string | TempateVariableObject[]>([
                ['text', 'texto del segundo map 2 uno']
            ]), */
            new TemplateVariableObject([
                ['text', 'texto del segundo map 3 uno']
            ])]
        ]
    ]),new TemplateVariableObject([
      ['key', 'clave dos'],
      ['value', 'valor del map numero dos'],
      ['name', 'nombre elemento 11111111111'],
      ['list2', 
          [/* new Map<string, string | TempateVariableObject[]>([
              ['text', 'texto del segundo map 1 uno']
          ]),
          new Map<string, string | TempateVariableObject[]>([
              ['text', 'texto del segundo map 2 uno']
          ]), */
          new TemplateVariableObject([
              ['text', 'texto del segundo map lakjsdfoije3 uno']
          ]),
          new TemplateVariableObject([
            ['text', 'texto del segundo map 3 unoJAJAJAJ SOY LA POLLA']
        ])]
      ]
  ])])

const newLines = LibofDocTemplateService.applyTemplate(content)
console.log(newLines)






