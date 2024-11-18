import { ForContent } from "../models/forContent"
import { TemplateVariableObject } from "../models/templateVariableObject"
import { getAppearForLine } from "../utils/forUtils"
import { formatXml, removeLineBreaks } from "../utils/stringUtils"
import { cleanLdtTags, deepCopyTemplateVariableObject, mergeLdtsInXml } from "../utils/variableUtils"
import { ForService } from "./forService"
import { VariableService } from "./variableService"
import { DocImage } from '../models/docImage'


 class LibofDocTemplateManagerServiceImp {
    private images: DocImage[] = []

    private async applyAllFor(lines:string[], variables: TemplateVariableObject): Promise<string[]> {
        variables = deepCopyTemplateVariableObject(variables)
        const baseForContent: ForContent = {
            elementName: 'parent',
            value: variables
        }
    
        const forApplyedLines = await ForService.applyNextFor(variables, lines, baseForContent)
        const nextForCommand = getAppearForLine(forApplyedLines)
        return nextForCommand
            ? await this.applyAllFor(forApplyedLines, variables)
            : forApplyedLines
    }

    private formatXml(contentXml:string){
        const xmlOneLine = removeLineBreaks(contentXml)
        const xmlCodeJoin = mergeLdtsInXml(xmlOneLine)
        const xmlWithbr = formatXml(xmlCodeJoin)
        let lines = xmlWithbr.split('\n')
        return cleanLdtTags(lines)
    }

    async applyTemplate(contentXml:string, variables: TemplateVariableObject){
        variables = deepCopyTemplateVariableObject(variables)
        let lines = this.formatXml(contentXml)
        lines = await this.applyAllFor(lines, variables)
        const tamplateLines = await VariableService.applyVariablesInLines(variables, lines)
        return tamplateLines.join(' ')
    }

    async getVariableValue(variables: TemplateVariableObject, variableName:string, forContent?:ForContent):  Promise<string | TemplateVariableObject[]> {
        if (variableName.includes('.') && forContent){
            const content = ForService.getForContent(variableName.split('.')[0], forContent)
            if (!content) throw Error('LibofDocTemplateError: Variable ' + variableName + ' not found.')  
            return await this.formatVariableToReturn(content!.value.get(variableName.split('.')[1])!)
        }
        return await this.formatVariableToReturn(variables.get(variableName)!)
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

    clearImages(){
        this.images = []
    }
}

export const LibofDocTemplateManagerService = new LibofDocTemplateManagerServiceImp()


