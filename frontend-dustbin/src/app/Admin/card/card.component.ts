import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/sesion/login.service';
interface SensoresSeleccionados {
  [key: string]: boolean;
}
interface sensoress {
  id?: number;
  name?: string;
  price?: number;
  battery_included?: boolean;
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
constructor(private authService: LoginService){

}

items!: sensoress[] ;



  ngOnInit() {
    const token = localStorage.getItem('token');

    this.authService.getModelSensor(token).subscribe(
      (res: sensoress[]) => {
        console.log(res);
        this.items = res;
      }
    );
      }
    


  sensores = ['Sensor 1', 'Sensor 2', 'Sensor 3'];
  sensoresSeleccionados: SensoresSeleccionados = {};

  batteryIncluded = false;


  submitForm(form: NgForm) {
    const token = localStorage.getItem('token')
    console.log(token)
    const data = {
      name: form.value.name,
      price: form.value.price,
      battery_included: this.batteryIncluded
    };
    console.log(data);

    this.authService.createModelSensor(data,token).subscribe(
      (res)=>
      {
        console.log(res)
      }
    )


    // send data to server or perform other actions
  }

    
  }



