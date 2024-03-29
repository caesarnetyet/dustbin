import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/sesion/login.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SensorsService } from 'src/app/services/sesion/sensors.service';
import { ClientService } from 'src/app/services/sesion/client.service';
import { Router, RouterLink } from '@angular/router';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

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
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
constructor(private authService: LoginService,private modalService: NgbModal, private sensor:SensorsService,  private clientService: ClientService, private router:Router){

}

items!: sensoress[] ;
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
    

  selectedSensorIds: number[] = [];
  batteryIncluded = false;
  isModalOpen = true;

  submitForm(form: NgForm) {
    const token = localStorage.getItem('token')
    console.log(token)
    const data = {
      name: form.value.name,
      price: form.value.price,
      battery_included: this.batteryIncluded,
      sensors: this.selectedSensorIds
      
    };

    this.sensor.createModelSensor(data,token).subscribe(
      (res)=>
      {     
        this.ngOnInit();
        window.location.reload();
      }

    )
  }

  onSensorSelectionChange() {
    this.selectedSensorIds = this.sensors.filter(sensor => sensor.selected).map(sensor => sensor.id);
  }
  
  cerrarSession(){
    this.authService.logout();
    
  }
  
  EliminarC( car:any ) {
    const id = car.id;
    const token = localStorage.getItem('token') ?? '';
    this.clientService.deleteCar(token,id).subscribe((res) => {
      alert("Se ha eliminado correctamente");
      this.ngOnInit();
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




