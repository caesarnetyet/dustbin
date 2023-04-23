import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/sesion/login.service';

@Component({
  selector: 'app-menu-dustbins',
  templateUrl: './menu-dustbins.component.html',
  styleUrls: ['./menu-dustbins.component.css']
})
export class MenuDustbinsComponent {

  constructor(private authService:LoginService) { }
   
  cerrarSession(){
    this.authService.logout();
    
  }

}
