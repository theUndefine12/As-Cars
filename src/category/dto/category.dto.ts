import { IsNotEmpty } from "class-validator";



export class categoryDto {
    @IsNotEmpty()
    title: string
}