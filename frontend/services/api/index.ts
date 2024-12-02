export * from './auth';
export * from './employee';
export * from './product';
export * from './sale';
export * from './supplier';
export * from './category';
export * from './client';
export * from './enterprise';
export * from './invoice';
export * from './permission';
export * from './role';

import { authService } from './auth';
import { employeeService } from './employee';
import { supplierService } from './supplier';
import { categoryService } from './category';
import { productService } from './product';

export const services = {
    auth: authService,
    employee: employeeService,
    supplier: supplierService,
    category: categoryService,
    product: productService
};