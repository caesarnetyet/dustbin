import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.css']
})
export class SensorCardComponent {
  @Input() sensor: any;
}

