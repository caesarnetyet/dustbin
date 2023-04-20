import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSensoresComponent } from './Admin/menu-sensores/menu-sensores.component';
import { MenuAdminComponent } from './Admin/menu-admin/menu-admin.component';
import { LoginComponent } from './session/features/login/login.component';
import { RegisterComponent } from './session/features/register/register.component';
import { MenuComponent } from './session/features/menu/menu.component';
import { EmailComponent } from './session/features/email/email.component';
import { NotFoundComponent } from './session/features/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'sMenu', component: MenuSensoresComponent },
  { path: 'aMenu', component: MenuAdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'email', component: EmailComponent },

  { path:'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

