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

  constructor(private api: BinsService, private infService: InformationService) {
    infService.streamedGraph$.subscribe((resp) => {
      try {
        console.log(resp);
        let jsonResponse = JSON.parse(resp)
        let formattedDate = new Date(jsonResponse.time).toLocaleTimeString()
        this.timeArray.push(formattedDate)
        this.temperatureArray.push(jsonResponse.temperature)
        this.moistureArray.push(jsonResponse.moisture)
        this.humidityArray.push(jsonResponse.humidity)
        this.destroyCharts();
        this.createCharts();
      }
      catch {

      }


    })
  }
  tempChart: any;
  humidityChart: any;
  soilHumidityChart: any;
  binId: number = 0
  test: any;
  Subscription1$!: Subscription
  Graph$!: Subscription
  timeArray: any[] = []
  temperatureArray: any[] = []
  moistureArray: any[] = []
  humidityArray: any[] = []

  ngOnInit(): void {
    setTimeout(() => {
      this.Subscription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.binId = resp;
        this.loadCharts();
      })
    }, 100)

  }



  loadCharts() {
    this.temperatureArray = []
    this.moistureArray = []
    this.humidityArray = []
    this.timeArray = []
    if (this.tempChart != undefined) {
      this.destroyCharts();
    }
    this.getCharts()
    setTimeout(() => {

      this.createCharts()
    }, 500)
  }


  getCharts() {
    this.api.getSensorReadings(this.binId).subscribe(resp => {
      resp.sensorReadings.forEach(element => {
        let formattedDate = new Date(element.time).toLocaleTimeString()
        this.timeArray.push(formattedDate)
        this.temperatureArray.push(element.temperature)
        this.moistureArray.push(element.moisture)
        this.humidityArray.push(element.humidity)
      });

    })
  }

  destroyCharts() {
    this.tempChart.destroy();
    this.humidityChart.destroy();
    this.soilHumidityChart.destroy();
  }


  createCharts() {
    this.tempChart = new Chart("tempChart", {
      type: 'line',
      data: {
        labels: this.timeArray,
        datasets: [{
          tension: 0.6,
          label: 'Temperature',
          data: this.temperatureArray,
          fill: true,
          borderColor: '#378C53', // Add custom color border (Line)
          backgroundColor: '#2DC6534D', // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
        }]
      },
    });

    this.soilHumidityChart = new Chart("humidityChart", {
      type: 'line',
      data: {
        labels: this.timeArray,
        datasets: [{
          tension: 0.6,
          label: 'Soil Moisture',
          data: this.moistureArray,
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

        labels: this.timeArray,
        datasets: [{
          tension: 0.6,
          label: 'Air Humidity',
          data: this.humidityArray,
          fill: true,
          borderColor: '#378C53', // Add custom color border (Line)
          backgroundColor: '#2DC6534D', // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
        }]
      },
    });
  }

}
