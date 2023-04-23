import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/sesion/client.service';
import { LoginService } from 'src/app/services/sesion/login.service';
import {User} from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-menu-clients',
  templateUrl: './menu-clients.component.html',
  styleUrls: ['./menu-clients.component.css']
})
export class MenuClientsComponent {
  constructor(private authService:LoginService,private client:ClientService) { }
  users:User[] = [];
  ngOnInit(): void {
    this.client.getAll( localStorage.getItem('token')).subscribe(  
      (res:User[]) => {
        console.log(res);
        this.users = res;
      }
    );


  }
   
  cerrarSession(){
    this.authService.logout();
    
  }

}
