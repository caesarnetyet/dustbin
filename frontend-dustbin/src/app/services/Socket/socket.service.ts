import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {
  socket = io("192.168.119.26:3333");// Cambia esto por la URL de tu servidor de socket

  // constructor() {
  //   this.socket = io(this.url);
  // }

  ngOnInit(): void {
    this.socket.on('Inclinacion', () => {
      console.log(this.socket.id);
    });
  }
}
