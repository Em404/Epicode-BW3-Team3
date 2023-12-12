import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PreferitiComponent } from './pages/preferiti/preferiti.component';
import { ProdottoComponent } from './pages/prodotto/prodotto.component';
import { CartComponent } from './components/cart/cart.component';
import { FormComponent } from './pages/form/form.component';
import { LoginGuard } from './pages/auth/login.guard';
import { AuthGuard } from './pages/auth/auth.guard';
import { EditComponent } from './pages/edit/edit.component';

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
    component: PreferitiComponent,
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
    path: "edit/:id",
    component: EditComponent,
    title: "edit | Marketplace",
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
