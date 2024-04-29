import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { ContactComponent } from './views/contact/contact.component';
import { LoginComponent } from './views/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'contact', component: ContactComponent }
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    }
];
