import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './session/features/login/login.component';
import { RegisterComponent } from './session/features/register/register.component';
import { MenuComponent } from './session/features/menu/menu.component';
import { MenuAdminComponent } from './Admin/menu-admin/menu-admin.component';
import { MenuSensoresComponent } from './Admin/menu-sensores/menu-sensores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './session/features/email/email.component';
import { NotFoundComponent } from './session/features/not-found/not-found.component';
import { MenuClientsComponent } from './Admin/menu-clients/menu-clients.component';
import { MenuDustbinsComponent } from './Admin/menu-dustbins/menu-dustbins.component';
import { CardComponent } from './Admin/card/card.component';
import { EditarComponent } from './Admin/editar/editar.component';
import { JoystickComponent } from './components/ws/joystick/joystick.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    MenuAdminComponent,
    MenuSensoresComponent,
    EmailComponent,
    NotFoundComponent,
    MenuClientsComponent,
    MenuDustbinsComponent,
    CardComponent,
    EditarComponent,
    JoystickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
