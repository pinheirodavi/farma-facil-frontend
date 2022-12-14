import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { LoggedinGuard } from './authentication/guards/loggedin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: SidenavComponent, canActivate: [LoggedinGuard],children: [
    //aqui irão os componentes dentro do sidenav
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'providers', loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule) },
    { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: 'customers', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
