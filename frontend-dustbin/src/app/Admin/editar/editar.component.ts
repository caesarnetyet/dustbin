import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/sesion/client.service';
import { SensorsService } from 'src/app/services/sesion/sensors.service';



interface sensoress {
  id?: number;
  name?: string;
  price?: number;
  battery_included?: boolean;
  sensors?: any;
  created_at?: string;
  updated_at?: string;
}
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {



  id: number = 0;
  name: string = '';
  description: string = '';
  type: string = '';

  constructor(private sensor: SensorsService, private router: Router, private clientService: ClientService) { }
  items!: sensoress[];
  sensors!: any[];


  ngOnInit() {
    const token = localStorage.getItem('token');

    this.sensor.getModelSensor(token).subscribe(
      (res: sensoress[]) => {
        this.items = res;
      }
    );
    this.sensor.getSensors(token).subscribe(
      (res: any) => {
        this.sensors = res;
      }
    );
  }
  EliminarC(car: any) {
    const id = car.id;
    const token = localStorage.getItem('token') ?? '';
    this.clientService.deleteCar(token, id).subscribe((res) => {
      alert("Se ha eliminado correctamente");
      this.ngOnInit();

    },
      (err) => {
        if (err == 500) {
          alert("Nos encontramos en mantenimiento");
        }
        if (err == 400) {
          alert("No se ha podido eliminar");
        }
      }

    );


  }


}