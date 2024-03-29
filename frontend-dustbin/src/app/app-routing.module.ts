import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSensoresComponent } from './Admin/menu-sensores/menu-sensores.component';
import { MenuAdminComponent } from './Admin/menu-admin/menu-admin.component';
import { LoginComponent } from './session/features/login/login.component';
import { RegisterComponent } from './session/features/register/register.component';
import { MenuComponent } from './session/features/menu/menu.component';
import { EmailComponent } from './session/features/email/email.component';
import { NotFoundComponent } from './session/features/not-found/not-found.component';
import { MenuClientsComponent } from './Admin/menu-clients/menu-clients.component';
import { MenuDustbinsComponent } from './Admin/menu-dustbins/menu-dustbins.component';
import { RoleGuard } from './guards/roles/role.guard';


import { LoginGuard } from './guards/Login/login.guard';
import { AuthGuard } from './guards/Usuario/usuario.guard';
import { CardComponent } from './Admin/card/card.component';
import { JoystickComponent } from './components/ws/joystick/joystick.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'aMenu', component: MenuAdminComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'sMenu', component: MenuSensoresComponent, canActivate: [AuthGuard] },
  { path: 'cMenu', component: MenuClientsComponent, canActivate: [AuthGuard] },
  { path: 'dMenu', component: MenuDustbinsComponent, canActivate: [AuthGuard] },
  { path: 'menuS', component: CardComponent, canActivate: [AuthGuard] },

  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'email', component: EmailComponent, },
  { path: 'joystick', component: JoystickComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

