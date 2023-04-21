import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/Socket/socket.service';
import { Chart } from 'chart.js';

import { io } from "socket.io-client";

@Component({
  selector: 'app-menu-sensores',
  templateUrl: './menu-sensores.component.html',
  styleUrls: ['./menu-sensores.component.css'],

})
export class MenuSensoresComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: any;
  chartData: any = {};

  constructor(private socketService: SocketService, private elementRef: ElementRef) { }
  socket = io("192.168.1.7:3333");

  ngOnInit() {
    // this.createChart();
    // this.listenForChartData();
    // console.log(this.chartCanvas.nativeElement);
    this.helloSocket();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return; // Return early if context is null
    }
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Proceso 1', 'Proceso 2', 'Proceso 3'],
        datasets: [{
          label: 'Porcentaje de procesos completados',
          data: [30, 50, 20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }


  // Método para escuchar los datos del servidor de socket
  listenForChartData() {
   /* this.socketService.getChartData().subscribe((data: any) => {
      this.chartData = data;
      this.updateChart();
    });*/
  }

  // Método para actualizar el gráfico circular con los nuevos datos
  updateChart() {
    this.chart.data.datasets[0].data = this.chartData;
    this.chart.update();
  }


  helloSocket() {
    this.socket.on('connect', () => {
      console.log(this.socket.id);
    });
    this.socket.on('event', (data: any) => {
      console.log(data);
    });
  }
}

