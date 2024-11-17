import { ForContent } from "../models/forContent"
import { TemplateVariableObject } from "../models/templateVariableObject"
import { getAppearForLine } from "../utils/forUtils"
import { formatXml, removeLineBreaks } from "../utils/stringUtils"
import { cleanLdtTags, mergeLdtsInXml } from "../utils/variableUtils"
import { ForService } from "./forService"
import { VariableService } from "./variableService"
import { DocImage } from '../models/docImage'


 class LibofDocTemplateManagerServiceImp {

    private variables: TemplateVariableObject = new Map()
    private images: DocImage[] = []


    addVariable(name:string, value: string | TemplateVariableObject[] | Blob){
        this.variables.set(name, value)
    }

    removeVariables(){
        this.variables = new Map()
        this.images = []
    }

    private async applyAllFor(lines:string[]): Promise<string[]> {
        const baseForContent: ForContent = {
            elementName: 'parent',
            value: this.variables
        }
    
        const forApplyedLines = await ForService.applyNextFor(lines, baseForContent)
        const nextForCommand = getAppearForLine(forApplyedLines)
        return nextForCommand
            ? await this.applyAllFor(forApplyedLines)
            : forApplyedLines
    }

    private formatXml(contentXml:string){
        const xmlOneLine = removeLineBreaks(contentXml)
        const xmlCodeJoin = mergeLdtsInXml(xmlOneLine)
        const xmlWithbr = formatXml(xmlCodeJoin)
        let lines = xmlWithbr.split('\n')
        return cleanLdtTags(lines)
    }

    async applyTemplate(contentXml:string){
        let lines = this.formatXml(contentXml)
        lines = await this.applyAllFor(lines)
        const tamplateLines = await VariableService.applyVariablesInLines(lines)
        return tamplateLines.join(' ')
    }

    async getVariableValue(variableName:string, forContent?:ForContent):  Promise<string | TemplateVariableObject[]> {
        if (variableName.includes('.') && forContent){
            const content = ForService.getForContent(variableName.split('.')[0], forContent)
            if (!content) throw Error('LibofDocTemplateError: Variable ' + variableName + ' not found.')   
            return await this.formatVariableToReturn(content!.value.get(variableName.split('.')[1])!)
        }

        return await this.formatVariableToReturn(this.variables.get(variableName)!)
    }

    private async formatVariableToReturn(variableValue: string | TemplateVariableObject[] | Blob){
        if (variableValue instanceof Blob) {
            const docImage = await DocImage.fromBlob(variableValue)
            this.images.push(docImage)
            return docImage.getODTValue()
        } 

        return variableValue
    }

    getImages() {
        return this.images
    }
}

export const LibofDocTemplateManagerService = new LibofDocTemplateManagerServiceImp()


