import { IsNotEmpty, MinLength } from "class-validator";



export class adminDto {
    @IsNotEmpty()
    username: string

    @MinLength(8, {
        message: 'Password need be min 8 symbols'
    })
    password: string
} 