import { Routes } from '@angular/router';
import { ProductGridComponent } from './components/product-grid/product-grid.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductGridComponent }
];
