/* eslint-disable prettier/prettier */
import {
    IsAlphanumeric,
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Le nom doit comporter au moins 2 caractères.' })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric(null, {
        message: `Le nom d utilisateur n autorise 
  que les caractères alphanumériques.`,
    })
    username: string;

    @IsNotEmpty()
    @IsEmail(null, { message: 'Veuillez fournir un e-mail valide.' })
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: `Le mot de passe doit contenir minimum 8 et maximum 20 caractères,
    au moins une lettre majuscule,
    une lettre minuscule,
    un numéro et
    un caractère spécial`,
    })
    password: string;
}
