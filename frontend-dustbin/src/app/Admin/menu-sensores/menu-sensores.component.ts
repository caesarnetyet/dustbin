import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/Socket/socket.service';
import { Chart } from 'chart.js';
import { LoginService } from 'src/app/services/sesion/login.service';
import { SensorsService } from 'src/app/services/sesion/sensors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface sensores {
  id?: number;
  name?: string;
  type?: string;
  description?: string;
}



@Component({
  selector: 'app-menu-sensores',
  templateUrl: './menu-sensores.component.html',
  styleUrls: ['./menu-sensores.component.css'],

})
export class MenuSensoresComponent {
  @ViewChild('contenido') contenido: any;


  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: any;
  chartData: any = {};

  constructor(private socketService: SocketService, private elementRef: ElementRef, private auth:LoginService, private senosor:SensorsService
    ,private modal: NgbModal) { }
 sensor: sensores[] = [];
  ngOnInit() {
     
    this.senosor.getSensors(localStorage.getItem('token')).subscribe(
      (res: sensores[]) => {
        console.log(res);
        this.sensor = res;

      
      }
    );
    
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return; // Return early if context is null
    }
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Distancia del sensor (cm)',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              tooltipFormat: 'll HH:mm:ss'
            },
            ticks: {
              source: 'data',
              autoSkip: true
            }
          },
          y: {
            beginAtZero: true

        }
      }
    }
    });
  }
   
  cerrarSession(){
    this.auth.logout();
    
  }

 
  submit() {
  }
id:number=0;
name:string='';
type:string='';
description:string='';
  EditarB(bike:any) {
    this.id=bike.id;
  this.modal.open(this.contenido);
  }
  abrirC()
{
  const id = this.id ?? 0;
  console.log(id);
  const bike = {
    name: this.name,
    type: this.type,
    description: this.description,
  };
  console.log(bike);
  const token = localStorage.getItem('token') ?? '';

  this.senosor.update(id,bike,token).subscribe(
    (res) => {
      console.log(res);
      this.modal.dismissAll();
      this.ngOnInit();
    }
  );

}
  
}

