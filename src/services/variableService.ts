import { ForContent } from "../models/forContent"
import { TemplateVariableObject } from "../models/templateVariableObject"
import { removeSpacesInRange } from "../utils/stringUtils"
import { endCommand, variableCommand } from "../utils/templateComands"
import { deepCopyTemplateVariableObject, getVariableName } from "../utils/variableUtils"
import { LibofDocTemplateManagerService } from "./templateManagerService"

 class VariableServiceImp {
    
     async applyVariablesInLines(variables: TemplateVariableObject, lines:string[], forContent?:ForContent): Promise<string[]> {
        variables = deepCopyTemplateVariableObject(variables)
        
        const newLines:string[] = []
        for (let line of lines){
            newLines.push(line.includes(variableCommand)
            ? await this.applyVariable(variables, line, forContent)
            : line)
        }

        return this.hasVariablesToChange(newLines)
            ? await this.applyVariablesInLines(variables, newLines, forContent)
            : newLines
    }

     hasVariablesToChange(lines:string[]): boolean {
        let hasVariables = false

        lines.forEach(line => {
            if (line.includes(variableCommand)) hasVariables = true
        })

        return hasVariables
    }
   

     async applyVariable(variables: TemplateVariableObject, line:string, forContent?:ForContent): Promise<string> {
        variables = deepCopyTemplateVariableObject(variables)

        const startIndex = line.indexOf(variableCommand)
        const endIndex = line.indexOf(endCommand, startIndex)
        const lineWithoutSpaces = removeSpacesInRange(line, startIndex, endIndex)
        const variableName = getVariableName(line)

        console.log('se va a aplicar la variable: ', variableName)

        try {
            const variableFullCommand:string = (variableCommand + variableName + endCommand).replace(' ','')
            const variableValue = await LibofDocTemplateManagerService.getVariableValue(variables, variableName, forContent) as string
            return lineWithoutSpaces.replace(variableFullCommand, variableValue)
            
        } catch (error) {
         throw Error('LibofDocTemplateError: Variable to apply ' + variableName + ' has an error.')   
        }
    }
}

export const VariableService = new VariableServiceImp()