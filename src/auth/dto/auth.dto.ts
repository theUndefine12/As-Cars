import { IsNotEmpty, IsOptional, MinLength } from "class-validator";



export class AuthDto {
    @IsOptional()
    @IsNotEmpty()
    username: string
    
    @IsNotEmpty()
    phone: string

    @MinLength(8, {
        message: 'Password need be min 8'
    })
    password: string
}

