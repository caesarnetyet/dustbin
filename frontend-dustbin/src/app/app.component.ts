import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/Socket/socket.service';
import { io } from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket = io("192.168.119.26:3333");
  title = 'frontend-dustbin';


}
