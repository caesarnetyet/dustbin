import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/sesion/client.service';
import { SensorsService } from 'src/app/services/sesion/sensors.service';


interface sensoress {
  id?: number;
  name?: string;
  price?: number;
  battery_included?: boolean;
  sensors?:any;
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

  constructor(private sensor:SensorsService, private router: Router,private clientService:ClientService) {}
  items!: sensoress[] ;
sensors!: any[];
  ngOnInit() {
    const token = localStorage.getItem('token');

    this.sensor.getModelSensor(token).subscribe(
      (res: sensoress[]) => {
        console.log(res);
        this.items = res;
      }
    );
    this.sensor.getSensors(token).subscribe(
      (res: any) => {
        console.log(res);
        this.sensors = res;
      }
    );
      }
  EliminarC( car:any ) {
    console.log(car);
    const id = car.id;
    console.log(id);
    const token = localStorage.getItem('token') ?? '';
    console.log(id);
    this.clientService.deleteCar(token,id).subscribe((res) => {
      alert("Se ha eliminado correctamente");
      
    },
    (err) => {
      if (err == 500)
      {
        alert("Nos encontramos en mantenimiento");
      }
      if (err == 400)
      {
        alert("No se ha podido eliminar");
      }
    }
    
    );
    
    
    }

    
}