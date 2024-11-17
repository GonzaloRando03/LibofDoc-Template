import { ForContent } from "../models/forContent"
import { removeSpacesInRange } from "../utils/stringUtils"
import { endCommand, variableCommand } from "../utils/templateComands"
import { getVariableName } from "../utils/variableUtils"
import { LibofDocTemplateManagerService } from "./libofDocTemplateManagerService"

 class VariableServiceImp {
    
     async applyVariablesInLines(lines:string[], forContent?:ForContent): Promise<string[]> {

        const newLines:string[] = []
        for (let line of lines){
            newLines.push(line.includes(variableCommand)
            ? await this.applyVariable(line, forContent)
            : line)
        }
        /* const newLines = lines.map(line => {
            return line.includes(variableCommand)
                ? this.applyVariable(line, forContent)
                : line
                 }) */

        return this.hasVariablesToChange(newLines)
            ? await this.applyVariablesInLines(newLines, forContent)
            : newLines
    }

     hasVariablesToChange(lines:string[]): boolean {
        let hasVariables = false

        lines.forEach(line => {
            if (line.includes(variableCommand)) hasVariables = true
        })

        return hasVariables
    }
   

     async applyVariable(line:string, forContent?:ForContent): Promise<string> {
        const startIndex = line.indexOf(variableCommand)
        const endIndex = line.indexOf(endCommand, startIndex)
        const lineWithoutSpaces = removeSpacesInRange(line, startIndex, endIndex)
        const variableName = getVariableName(line)

        try {
            const variableFullCommand:string = (variableCommand + variableName + endCommand).replace(' ','')
            return lineWithoutSpaces.replace(variableFullCommand, await LibofDocTemplateManagerService.getVariableValue(variableName, forContent) as string)
            
        } catch (error) {
         throw Error('LibofDocTemplateError: Variable ' + variableName + ' not found.')   
        }
    }
}

export const VariableService = new VariableServiceImp()