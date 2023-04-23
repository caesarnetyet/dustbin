import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/sesion/login.service';
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {

  constructor( private router: Router, private auth:LoginService) { }
  cerrarSesion() {
    this.auth.logout();
  }

}
