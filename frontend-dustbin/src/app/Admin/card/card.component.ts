import { Component } from '@angular/core';
interface SensoresSeleccionados {
  [key: string]: boolean;
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  sensoress = [    {      modelo: 'Modelo 1',      descripcion: 'Descripción del modelo 1',      imagen: 'ruta/a/la/imagen1.jpg',      sensores: [        { modelo: 'Sensor 1', tipo: 'Tipo 1' },        { modelo: 'Sensor 2', tipo: 'Tipo 2' },        { modelo: 'Sensor 3', tipo: 'Tipo 3' }      ]
},
{
  modelo: 'Modelo 2',
  descripcion: 'Descripción del modelo 2',
  imagen: 'ruta/a/la/imagen2.jpg',
  sensores: [
    { modelo: 'Sensor 4', tipo: 'Tipo 4' },
    { modelo: 'Sensor 5', tipo: 'Tipo 5' },
    { modelo: 'Sensor 6', tipo: 'Tipo 6' }
  ]
}
];

  sensores = ['Sensor 1', 'Sensor 2', 'Sensor 3'];
  sensoresSeleccionados: SensoresSeleccionados = {};

  submitForm(form:any) {
    const nombre = form.value.nombre;
    const sensoresSeleccionados = [];
    for (const sensor in this.sensoresSeleccionados) {
      if (this.sensoresSeleccionados[sensor]) {
        sensoresSeleccionados.push(sensor);
      }
    }
    console.log('Nombre del carrito:', nombre);
    console.log('Sensores seleccionados:', sensoresSeleccionados);
  }


}
