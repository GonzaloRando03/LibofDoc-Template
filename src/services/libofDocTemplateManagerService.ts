import { ForContent } from "../models/forContent"
import { TemplateVariableObject } from "../models/templateVariableObject"
import { getAppearForLine } from "../utils/forUtils"
import { formatXml, removeLineBreaks } from "../utils/stringUtils"
import { cleanLdtTags, mergeLdtsInXml } from "../utils/variableUtils"
import { ForService } from "./forService"
import { VariableService } from "./variableService"


 class LibofDocTemplateManagerServiceImp {

    private variables: TemplateVariableObject = new Map()


    addVariable(name:string, value: string | TemplateVariableObject[]){
        this.variables.set(name, value)
    }

    removeVariables(){
        this.variables = new Map()
    }

    private applyAllFor(lines:string[]): string[] {
        const baseForContent: ForContent = {
            elementName: 'parent',
            value: this.variables
        }
    
        const forApplyedLines = ForService.applyNextFor(lines, baseForContent)
        const nextForCommand = getAppearForLine(forApplyedLines)
        return nextForCommand
            ? this.applyAllFor(forApplyedLines)
            : forApplyedLines
    }

    private formatXml(contentXml:string){
        const xmlOneLine = removeLineBreaks(contentXml)
        const xmlCodeJoin = mergeLdtsInXml(xmlOneLine)
        const xmlWithbr = formatXml(xmlCodeJoin)
        let lines = xmlWithbr.split('\n')
        return cleanLdtTags(lines)
    }

    applyTemplate(contentXml:string){
        let lines = this.formatXml(contentXml)
        lines = this.applyAllFor(lines)
        return VariableService.applyVariablesInLines(lines).join(' ')
    }

    getVariableValue(variableName:string, forContent?:ForContent):  string | TemplateVariableObject[] {
        if (variableName.includes('.') && forContent){
            const content = ForService.getForContent(variableName.split('.')[0], forContent)
            if (!content) throw Error('LibofDocTemplateError: Variable ' + variableName + ' not found.')   

            return content!.value.get(variableName.split('.')[1])!
        }

        return this.variables.get(variableName)!
    }
}

export const LibofDocTemplateManagerService = new LibofDocTemplateManagerServiceImp()


