import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    telephone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos")
}); 