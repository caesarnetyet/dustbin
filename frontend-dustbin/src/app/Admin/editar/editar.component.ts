import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SensorsService } from 'src/app/services/sesion/sensors.service';

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

  constructor(private sensor:SensorsService, private router: Router) {}

  onSubmit() {
    const car = {
      name: this.name,
     descrition:this.description,
     type: this.type

    };
    const token = localStorage.getItem('token') ?? '';

    this.sensor.update(this.id,car,token).subscribe(
      (res) => {
        alert('Successful');
        // redirigir a la página de coches
      },
      (err) => {
        alert('Error favor de verificar los datos');
      }
    );
  }
}