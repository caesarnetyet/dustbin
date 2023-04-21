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
  socket = io("192.168.117.27:3333");

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


  helloSocket() {
    this.socket.on('connect', () => {
      console.log(this.socket.id);
    });
    this.socket.on('Humo', (data: any) => {
      console.log(data);
    });
  }
}
