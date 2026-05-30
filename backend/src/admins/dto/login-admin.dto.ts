import { IsEmpty, IsString } from "class-validator";


export class LoginAdminDto {
    @IsString()
    @IsEmpty()
    email!: string;
    @IsString()
    @IsEmpty()
    password!: string;


}