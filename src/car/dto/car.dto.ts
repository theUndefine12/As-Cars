import { IsNotEmpty } from "class-validator";



export class carDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    category: string
}

