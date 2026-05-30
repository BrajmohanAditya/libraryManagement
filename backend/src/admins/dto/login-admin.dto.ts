import { IsEmpty, IsString } from "class-validator";

export class LoginAdminDto {
    @IsString()

    email!: string;

    @IsString()
    
    password!: string;
}