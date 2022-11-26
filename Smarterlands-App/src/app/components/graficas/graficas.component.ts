import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Bin, Bins } from '../../interfaces/bins.interface';
import { BinsService } from '../../services/bins.service';
import { Subscription } from 'rxjs';
import { InformationService } from '../../services/information.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraficasComponent implements OnInit {
  susbcription1$!: Subscription
  susbcription2$!: Subscription
  constructor(private api: BinsService, private ïnfService: InformationService) { }
  tempChart: any;
  humidityChart: any;
  soilHumidityChart: any;
  test: any;

  ngOnInit(): void {
    this.susbcription1$ = this.ïnfService.selectedCrop$.subscribe(resp => {
      this.test = []
      console.log(resp);
      for (const x of resp) {
        this.test.push(x.id)
      }
      console.log(this.test);
      this.charts()
    })



  }


  destroyCharts() {
    this.tempChart.destroy();
    this.humidityChart.destroy();
    this.soilHumidityChart.destroy();
  }


  charts() {
    this.tempChart = new Chart("tempChart", {
      type: 'line',
      data: {
        labels: this.test,
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

    this.humidityChart = new Chart("humidityChart", {
      type: 'line',
      data: {
        labels: ["tavo", "tavo2", "tavotest", "tavest", "tavusi", "tachurro", "churrosi"],
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

    this.humidityChart = new Chart("soilHumidityChart", {
      type: 'line',
      data: {
        labels: ["tavo", "tavo2", "tavotest", "tavest", "tavusi", "tachurro", "churrosi"],
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
