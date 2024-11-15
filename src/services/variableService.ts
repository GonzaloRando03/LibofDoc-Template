import { ForContent } from "../models/forContent"
import { removeSpacesInRange } from "../utils/stringUtils"
import { endCommand, variableCommand } from "../utils/templateComands"
import { getVariableName } from "../utils/variableUtils"
import { LibofDocTemplateManagerService } from "./libofDocTemplateManagerService"

 class VariableServiceImp {
    
     applyVariablesInLines(lines:string[], forContent?:ForContent): string[] {
        const newLines = lines.map(line => {
            return line.includes(variableCommand)
                ? this.applyVariable(line, forContent)
                : line
        })

        return this.hasVariablesToChange(newLines)
            ? this.applyVariablesInLines(newLines, forContent)
            : newLines
    }

     hasVariablesToChange(lines:string[]): boolean {
        let hasVariables = false

        lines.forEach(line => {
            if (line.includes(variableCommand)) hasVariables = true
        })

        return hasVariables
    }
   

     applyVariable(line:string, forContent?:ForContent): string {
        const startIndex = line.indexOf(variableCommand)
        const endIndex = line.indexOf(endCommand, startIndex)
        const lineWithoutSpaces = removeSpacesInRange(line, startIndex, endIndex)
        const variableName = getVariableName(line)

        try {
            const variableFullCommand:string = (variableCommand + variableName + endCommand).replace(' ','')
            return lineWithoutSpaces.replace(variableFullCommand, LibofDocTemplateManagerService.getVariableValue(variableName, forContent) as string)
            
        } catch (error) {
         throw Error('LibofDocTemplateError: Variable ' + variableName + ' not found.')   
        }
    }
}

export const VariableService = new VariableServiceImp()