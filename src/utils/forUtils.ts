import { endCommand, forCommand, forInCommand } from "./templateComands"

export function getAppearForLine(lines:string[]): string | null {
    for (const line of lines){
        if (line.includes(forCommand)) return line
    }

    return null
}

export function removeForCommand(forName:string, lines:string[]){
    const linesFilter = [...lines].filter(l => !l.includes(forName))
    return linesFilter
}

export function getForName(line:string){
    let startIndex = line.indexOf(forCommand)
    let endIndex = line.indexOf(endCommand, startIndex)

    const forLine = line.substring(startIndex, endIndex)

    let inIndex = forLine.indexOf(forInCommand) + 3
    
    return forLine.substring(inIndex, endIndex).replace(' ', '')
}


export function getForVariable(line:string){
    let startIndex = line.indexOf(forCommand)
    let endIndex = line.indexOf(forInCommand, startIndex)

    const forLine = line.substring(startIndex, endIndex)
    return forLine.replace(forCommand, '').replace(' ', '')
}