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
  @ViewChild('contenido') modalContent:any;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: any;
  chartData: any = {};

  constructor(private socketService: SocketService, private elementRef: ElementRef, private auth:LoginService, private senosor:SensorsService
    ,private modalService: NgbModal) { }
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


  // Método para escuchar los datos del servidor de socket
  listenForChartData() {
   /* this.socketService.getChartData().subscribe((data: any) => {
      this.chartData = data;
      this.updateChart();
    });*/
  }

  // Método para actualizar el gráfico con los nuevos datos
  updateChart() {
    const labels = Object.keys(this.chartData);
    const data = labels.map((label: any) => this.chartData[label]);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }
  name: string = '';
  type: string = '';
  description: string = '';
  Update(sens:sensores)
  {
    const data = {
      name: sens.name,
      type: sens.type,
      description: sens.description,
    }
    console.log(sens.id);

  }


  open(content:any) {
    console.log(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // modal closed
    }, (reason) => {
      // modal dismissed
    });
  }
  
}
