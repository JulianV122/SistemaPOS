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
import { productService } from './product';
import { saleService } from './sale';
import { supplierService } from './supplier';
import { categoryService } from './category';
import { clientService } from './client';
import { enterpriseService } from './enterprise';
import { invoiceService } from './invoice';
import { permissionService } from './permission';
import { roleService } from './role';

export const services = {
    auth: authService,
    employee: employeeService,
    product: productService,
    sale: saleService,
    supplier: supplierService,
    category: categoryService,
    client: clientService,
    enterprise: enterpriseService,
    invoice: invoiceService,
    permission: permissionService,
    role: roleService
};