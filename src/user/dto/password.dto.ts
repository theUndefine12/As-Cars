import { MinLength } from "class-validator";


export class passwordDto {
    @MinLength(8, {message: 'oldPassword neeed be 8 symbols'})
    oldPassword: string

    @MinLength(8, {message: 'newPassword neeed be 8 symbols'})
    newPassword: string
}
