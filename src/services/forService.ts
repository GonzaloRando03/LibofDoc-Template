import { ForContent } from "../models/forContent";
import { TemplateVariableObject } from "../models/templateVariableObject";
import { copyForContent, getAppearForLine, getForName, getForVariable, removeForCommand } from "../utils/forUtils";
import { endForCommand } from "../utils/templateComands";
import { LibofDocTemplateManagerService } from "./templateManagerService";
import { VariableService } from "./variableService";

class ForServiceImp {

     async applyNextFor(variables: TemplateVariableObject, lines:string[], forContent:ForContent): Promise<string[]> {
        const nextForCommand = getAppearForLine(lines)
    
        if (nextForCommand === null) return lines
    
        const nextForLines = this.getForLines(nextForCommand, lines)
        const nextForVariableName = getForVariable(nextForCommand)
        const nextForName = getForName(nextForCommand)
    
        let nextForApplyLines:string[] = []
        const nextForVariableContent = await LibofDocTemplateManagerService.getVariableValue(variables, nextForName, forContent) as TemplateVariableObject[]
        
        //Iteramos los elementos del for
        for (let content of nextForVariableContent){
            //Creamos el forContent de cada elemento
            const forContentForChild = copyForContent(forContent)
            const forElementForContent = this.addForContentLastChild(forContentForChild, {
                elementName: nextForVariableName,
                value: content
            })
    
            //Aplicamos los for hijos en caso necesario
            const forLinesWithoutCommand = removeForCommand(nextForName, [...nextForLines.forLines]) 

    
            const applyedChildForLines = await this.applyChildFors(variables, forLinesWithoutCommand, forElementForContent)

            const applyedVariablesForLines = await VariableService.applyVariablesInLines(variables, applyedChildForLines, forElementForContent)

            nextForApplyLines = nextForApplyLines.concat(applyedVariablesForLines)

        }
        //Sustituimos el for sin aplicar por el for aplicado
        const forApplyedLinesWithoutCommands = removeForCommand(nextForName, nextForApplyLines)
        const fullApplyLines = [...lines]
        fullApplyLines.splice(nextForLines.startIndex, nextForLines.endIndex - nextForLines.startIndex + 1, ...forApplyedLinesWithoutCommands)
        console.log('las líneas del for aplicado son: ', fullApplyLines.join(' '))
        return fullApplyLines
    }
    
    
     async applyChildFors(variables: TemplateVariableObject, lines:string[], forContent:ForContent): Promise<string[]> {
        const parentLines = [...lines]

        const applyedForLines = await this.applyNextFor(variables, parentLines, forContent)
  
        const nextForCommand = getAppearForLine(applyedForLines)

        if (nextForCommand !== null){
            return await this.applyChildFors(variables, applyedForLines, forContent)
        }

        return applyedForLines
    }
    
     addForContentLastChild(root: ForContent, newChild: ForContent) {
        let current = root;
        while (current.child) {
            current = current.child;
        }
        current.child = newChild;
        return root
    }
    
     getForContent(contentName:string, forContent:ForContent): ForContent | null {
        if (contentName === forContent.elementName) return forContent
        else if (forContent.child) return this.getForContent(contentName, forContent.child)
        else return null
    }
    
    getForLines(forCommandLine:string, lines: string[]){
        let startIndex = lines.indexOf(forCommandLine)
        let endIndex = -1
    
        const forLines:string[] = []
        forLines.push(lines[startIndex]);
    
        const forName = getForName(forCommandLine)
    
        for (let i = startIndex + 1; i < lines.length; i++) {
            const line = lines[i];
    
            if (line.includes(endForCommand) && line.includes(forName)) {
                endIndex = i;
                forLines.push(line)
                break
            } else {
                forLines.push(line)
            } 
        }
    
        return {forLines, startIndex, endIndex}
    }

     addNewForContentChild(child:ForContent, parents:ForContent[]): ForContent {
        //Nota: hacer una funcion que cambie de forContent a array de parents y viceversa.
        if (parents[parents.length - 1].child){
            parents.push(parents[parents.length - 1].child!)
            return this.addNewForContentChild(child, parents)
        } else {
            let forContent: ForContent = parents[parents.length - 1]
            forContent.child = child

            for (let i = 2; i < parents.length; i++) {
                const parentContent = parents[parents.length - i]
                parentContent.child = forContent
                forContent = parentContent
            }
            return forContent
        }
    }

     forContentToArray(content:ForContent, array:ForContent[] = []) :ForContent[] {
        array.push(content)
        if (content.child) return this.forContentToArray(content.child, array)
        else return array
    }
}


export const ForService = new ForServiceImp()