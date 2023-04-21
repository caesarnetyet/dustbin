import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSensoresComponent } from './Admin/menu-sensores/menu-sensores.component';
import { MenuAdminComponent } from './Admin/menu-admin/menu-admin.component';
import { LoginComponent } from './session/features/login/login.component';
import { RegisterComponent } from './session/features/register/register.component';
import { MenuComponent } from './session/features/menu/menu.component';
import { EmailComponent } from './session/features/email/email.component';
import { NotFoundComponent } from './session/features/not-found/not-found.component';
import { LoginGuard } from './guards/Login/login.guard';
import { AuthGuard } from './guards/Usuario/usuario.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'register', component: RegisterComponent,canActivate:[LoginGuard] },

  { path: 'sMenu', component: MenuSensoresComponent,canActivate:[AuthGuard] },
  { path: 'aMenu', component: MenuAdminComponent,canActivate:[AuthGuard] },
  { path: 'menu', component: MenuComponent,canActivate:[AuthGuard] },
  { path: 'email', component: EmailComponent,  },

  { path:'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

