import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.css']
})
export class JoystickComponent implements OnInit {
  ws = io('http://206.189.229.90:3333');
  private coordinates = new Array<Number>(2)
  ngOnInit(): void {
    this.ws.on('connect', () => {
      console.log('Connected to websocket server')
    })
  }

  onDragEnd(event: CdkDragEnd<any>) {

    event.source.reset();

    setTimeout(
      () => {
        this.coordinates[0] = 0
        this.coordinates[1] = 0
        this.sendCoordinates(this.coordinates)
      }, 500
    )

  }

  sendCoordinates(coordinates: Array<Number>) {
    this.ws.emit('joystick', coordinates)
  }
  onDragMove(event: CdkDragMove<any>) {
    this.coordinates[0] = (event.distance.x) / 76
    this.coordinates[1] = (event.distance.y * -1) / 76
    this.sendCoordinates(this.coordinates)

  }
}
