import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PreferitiComponent } from './pages/preferiti/preferiti.component';
import { ProdottoComponent } from './pages/prodotto/prodotto.component';
import { CartComponent } from './components/cart/cart.component';
import { FormComponent } from './pages/form/form.component';
import { LoginGuard } from './pages/auth/login.guard';
import { AuthGuard } from './pages/auth/auth.guard';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { ProdUserComponent } from './prod-user/prod-user.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: "",
    component: HomeComponent,
    title: "Home | Marketplace",
  },
  {
    path: "preferiti",
    component: PreferitiComponent,
    title: "Preferiti | Marketplace",
    canActivate: [AuthGuard],
  },
  {
    path: "profilo/:id",
    component: ProfiloComponent,
    title: "Profilo | Marketplace",
    canActivate: [AuthGuard],
  },
  {
    path:"prodotto/:id",
    component:ProdottoComponent,
    title: "Prodotto | Marketplace",
  },
  {
    path:"form",
    component:FormComponent,
    title: "Form | Marketplace",
    canActivate: [AuthGuard],
  },
  {
    path:'prod-user/:userId',
    component:ProdUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
