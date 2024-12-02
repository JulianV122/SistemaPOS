import { z } from 'zod';

export const registerEnterpriseSchema = z.object({
    name: z.string()
        .min(2, { message: "El campo debe tener minimo 2 caracteres" })
        .max(50, { message: "El campo debe tener maximo 50 caracteres" }),

    email: z.string()
        .email()
        .min(5, { message: "El campo debe tener minimo 5 caracteres" })
        .max(1000, { message: "El campo debe tener maximo 1000 caracteres" }),

    number: z.string()
        .min(10, { message: "El campo debe tener minimo 10 caracteres" })
        .max(10, { message: "El campo debe tener maximo 10 caracteres" }),

    nit: z.string()
        .min(10, { message: "El campo debe tener minimo 10 caracteres" })
        .max(10, { message: "El campo debe tener maximo 10 caracteres" }),
    city: z.string()
        .min(4, { message: "El campo debe tener minimo 4 caracteres" })
        .max(50, { message: "El campo debe tener maximo 50 caracteres" }),



})