import { TemplateVariableObject } from "./templateVariableObject";


export interface ForContent {
    elementName: string,
    value: TemplateVariableObject
    child?: ForContent
}