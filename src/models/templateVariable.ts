import { TemplateVariableObject } from "./templateVariableObject";

export interface TemplateVariable  {
    name:string,
    value: string | TemplateVariableObject[] | Blob
}