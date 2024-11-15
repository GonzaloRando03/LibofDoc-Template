# Libof Doc

Library for generating odt and doc documents for JavaScript and TypeScript

## Installation
You can install the library via npm:
```
npm install libof-doc
```

## Usage

### Create new document
```
import { LibofDocument } from 'libof-doc';

const document = new LibofDocument("testDocument");
```

### Titles
```
import {Lh1, Lh2, Lh3, Lh4} from 'libof-doc'

document.addElement(new Lh1("1 - Title", '#7da6fd'))
document.addElement(new Lh2("1.1 - Title", '#000000', '#7da6fd', 'Serif'))
document.addElement(new Lh3("1.1.1 - Title"))
document.addElement(new Lh4("1.1.1.1 - Title"))

// #000000 => text color
// #7da6fd => background color
// Serif => font
```

<b>IMPORTANT: </b> All components have the color, background color and font properties.


### Text
```
import {LParagraph, LTextItalic, LTextBold, LText, lWhiteSpace, lLineBreak} from 'libof-doc'

const p1 = new LParagraph()

p1.addText(new LText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"))

p1.addText(new LTextBold('Text bold'))

p1.addText(new LTextItalic('Text italic'))

document.addElement(p1)

```

### Lists
```
import {LOrderedList, LUnorderedList} from 'libof-doc'

//Simple list
const p2 = new LParagraph()
p2.addText(new LText("List element"))

const elementList = [
    p2, p2, p2, p2
]
document.addElement(new LOrderedList(elementList))
document.addElement(new LUnorderedList(elementList))

//Concatenated lists
const concatList = [
    p2, p2, p2, p2,
new LUnorderedList(elementList)
]
document.addElement(new LUnorderedList(concatList))
```

### Tables
```
import {LTable, LTableElement, LTableRow} from 'libof-doc'

const table = new LTable()

const p3 = new LParagraph()
p3.addText(new LTextBold('Table Title'))

const p4 = new LParagraph()
p4.addText(new LText('Table Element'))
  
const tableRow1 = new LTableRow([
    new LTableElement(p3, 5, 1, null, null,'#000000', '#7da6fd'),
    new LTableElement(p3, 5, 1, null, null,'#000000', '#7da6fd'),
    new LTableElement(p3, 5, 1, null, null,'#000000', '#7da6fd'),
    new LTableElement(p3, 5, 1, null, null,'#000000', '#7da6fd'),
])

const tableRow2 = new LTableRow([
    new LTableElement(p4, 5, 2),
    new LTableElement(p4, 5, 2),
    new LTableElement(p4, 5, 2),
    //This element has rowspan
    new LTableElement(p4, 5, 2, null, 2),
])

const tableRow3 = new LTableRow([
    //This element has colspan
    new LTableElement(p4, 5, 2, 2),
    new LTableElement(p4, 5, 2),
])

table.addRow(tableRow1)
table.addRow(tableRow2)
table.addRow(tableRow3)

document.addElement(table)
```

### Images
```
import {LImage} from 'libof-doc'

//Images with PageBreaks
document.addPageBreak()
document.addElement(new LImage(imageBase64, 100, 100))
```

### Download Document
You can transform the document into a blob or download it directly:
```
//you can transform the document into a blob 
const blob = await document.documentToBlob() //ODT 
const docxBlob = await document.documentToDocxBlob() //DOCX

//or you cat download the document 
await document.download() //ODT
await document.downloadAsDOCX() //DOCX
```

### Generate Indexes
You can generate indexes in your document
```
document.generateIndex()
```

### Add Front Pages
```
const frontPage = new LFrontPage()
frontPage.addElement(new Lh1("Main title"))

document.addFrontPage(frontPage)
```

### HTML
You can insert HTML content into your document :)

```
import {LHtml} from 'libof-doc'

const html = new LHtml('<p>this text is written in html using <b>Libof doc</b></p>')
document.addElement(html)
```


## Viewing the document
### Content
![image](https://github.com/GonzaloRando03/Libof-Doc/assets/103594582/ac1527f5-b622-43b8-bda5-bdddb361df59)

### Image
![image](https://github.com/GonzaloRando03/Libof-Doc/assets/103594582/2f9f61d5-907b-4aec-b716-8553984141e3)

### Index
![image](https://github.com/GonzaloRando03/Libof-Doc/assets/103594582/5294023e-ee52-4609-baa3-55b353e973e3)

### Front Page
![image](https://github.com/GonzaloRando03/Libof-Doc/assets/103594582/500fecc0-cae5-4310-a814-319d56c7c8b9)







  
