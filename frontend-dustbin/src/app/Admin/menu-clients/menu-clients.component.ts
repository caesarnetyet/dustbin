import { Component, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/sesion/client.service';
import { LoginService } from 'src/app/services/sesion/login.service';
import {User} from 'src/app/models/usuario.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-menu-clients',
  templateUrl: './menu-clients.component.html',
  styleUrls: ['./menu-clients.component.css']
})
export class MenuClientsComponent {
  @ViewChild('contenido') contenido: any;

  constructor(private authService:LoginService,private client:ClientService, private modal: NgbModal) { }
  users:User[] = [];
  selectedUser: Partial<User> = {};
  
  ngOnInit(): void {
    this.client.getAll( localStorage.getItem('token')).subscribe(  
      (res:User[]) => {
        this.users = res;
      }
    );
  }

  editUser(user:User){
    this.selectedUser = user;
    this.modal.open(this.contenido); 
  }

  abrirC() {
    console.log(this.selectedUser);
    this.selectedUser.email = undefined
    this.client.editUser(localStorage.getItem('token') ?? "", this.selectedUser).subscribe(data => console.log(data))
    }
   
  cerrarSession(){
    this.authService.logout();
    
  }

  
}
