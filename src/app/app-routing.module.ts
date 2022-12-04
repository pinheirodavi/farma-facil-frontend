import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { LoggedinGuard } from './authentication/guards/loggedin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: SidenavComponent, canActivate: [LoggedinGuard],children: [
    //aqui irão os componentes dentro do sidenav
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: 'customers', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
