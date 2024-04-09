import { IsNotEmpty } from "class-validator";



export class tokenDto {
    @IsNotEmpty()
    refreshToken: string
}
