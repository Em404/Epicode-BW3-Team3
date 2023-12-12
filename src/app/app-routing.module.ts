import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PreferitiComponent } from './pages/preferiti/preferiti.component';
import { ProdottoComponent } from './pages/prodotto/prodotto.component';
import { CartComponent } from './components/cart/cart.component';
import { FormComponent } from './pages/form/form.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "",
    component: HomeComponent,
    title: "Home",
  },
  {
    path: "preferiti",
    component: PreferitiComponent,
    title: "Preferiti",
  },
  {
    path: "profilo/:id",
    component: PreferitiComponent,
    title: "Profilo",
  },
  {
    path:"prodotto/:id",
    component:ProdottoComponent
  },
  {
    path:"form",
    component:FormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
