import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private url = 'http://localhost:3000'; // Cambia esto por la URL de tu servidor de socket

  constructor() {
    this.socket = io(this.url);
  }

  // Método para recibir datos del servidor
  public getChartData = () => {
    return Observable.create((observer: any) => {
      this.socket.on('sensor', (data: any) => {
        observer.next(data);
      });
    });
  }
}
