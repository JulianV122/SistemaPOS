import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().
    email()
    .min(5, {message:"El campo debe tener minimo 5 caracteres"})
    .max(1000, {message:"El campo debe tener maximo 1000 caracteres"}),
    password: z.string()
    .min(6, {message: "El campo debe tener minimo 5 catacteres"})
    .max(50, {message: "El campo debe tener maximo 50 caracteres"})
})