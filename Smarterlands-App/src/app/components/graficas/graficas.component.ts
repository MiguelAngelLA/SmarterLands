import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraficasComponent implements OnInit {

  constructor() { }

  tempChart:any;
  humidityChart:any;
  soilHumidityChart:any;

  ngOnInit(): void {
    this.charts();
  }

  charts(){
    this.tempChart = new Chart( "tempChart", {
      type:'line',
      data:{
        labels: ["tavo","tavo2","tavotest","tavest","tavusi","tachurro","churrosi"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#378C53', // Add custom color border (Line)
          backgroundColor: '#2DC6534D', // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
        }]
      },
    });

    this.humidityChart = new Chart( "humidityChart", {
      type:'line',
      data:{
        labels: ["tavo","tavo2","tavotest","tavest","tavusi","tachurro","churrosi"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#378C53', // Add custom color border (Line)
          backgroundColor: '#2DC6534D', // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
        }]
      },
    });

    this.humidityChart = new Chart( "soilHumidityChart", {
      type:'line',
      data:{
        labels: ["tavo","tavo2","tavotest","tavest","tavusi","tachurro","churrosi"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#378C53', // Add custom color border (Line)
          backgroundColor: '#2DC6534D', // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
        }]
      },
    });
  }

}
