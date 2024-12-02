import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string()
    .min(2, {message: "El campo debe tener minimo 2 caracteres"})
    .max(50, {message: "El campo debe tener maximo 50 caracteres"}),

    lastname: z.string()
    .min(2, {message: "El campo debe tener minimo 2 caracteres"})
    .max(50, {message: "El campo debe tener maximo 50 caracteres"}),

    email: z.string()
    .email()
    .min(5, {message: "El campo debe tener minimo 5 caracteres"})
    .max(1000, {message: "El campo debe tener maximo 1000 caracteres"}),

    telephone: z.string()
    .min(10, {message: "El campo debe tener minimo 10 caracteres"})
    .max(10, {message: "El campo debe tener maximo 10 caracteres"}),

    password: z.string()
    .min(6, {message: "El campo debe tener minimo 6 caracteres"})
    .max(50, {message: "El campo debe tener maximo 50 caracteres"}),

    repeatPassword: z.string()
    .min(6, {message: "El campo debe tener minimo 6 caracteres"})
    .max(50, {message: "El campo debe tener maximo 50 caracteres"}),
    
    terms: z.boolean()
    .refine(data => data === true, {message: "Debes aceptar los terminos y condiciones"}),


})