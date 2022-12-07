import { Component, OnInit } from '@angular/core';
import { BinsService } from '../../services/bins.service';
import { BinDimensionsComponent } from './bin-dimensions/bin-dimensions.component';
import { MatDialog } from '@angular/material/dialog';
import { InformationService } from '../../services/information.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { SensorReading } from '../../interfaces/sensor.interface';
import { EditBinDialogComponent } from './edit-bin-dialog/edit-bin-dialog.component';
import { LogsDialogComponent } from './logs-dialog/logs-dialog/logs-dialog.component';
import { animate, style, transition, trigger } from '@angular/animations';




@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]

})
export class NotificationComponent implements OnInit {

  susbcription1$!: Subscription
  binId: any;
  wsMsg: any = "stop";
  type!: any;
  time!: any;
  x: any;
  notifications: any[] = [];
  sensorReadings!: SensorReading[];
  lastSensorReading!: SensorReading
  awaitFetch: boolean = false
  binTitle: any;
  wsResponse: SensorReading = {
    id: 0,
    time: "2015-05-16T05:50:06",
    temperature: 0,
    humidity: 0,
    moisture: 0,
    precipitation: 0,
    bin_id: 0,
    notification_id: 0
  };
  constructor(private chatService: ChatService, private sensorNotification: BinsService, private infService: InformationService, private dialog: MatDialog) {
    this.chatService.messages.subscribe((msg: any) => {
      try {
        this.wsResponse = JSON.parse(msg.data)
        infService.sendGraph(msg.data)
        this.getLiveNotifications();
      }
      catch {

      }



    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.binId = resp
        this.getNotifications()
        this.getBinInfo();
        this.getSensorReadings();

      })
    },)
  }

  getSensorReadings() {
    this.sensorNotification.getSensorReadings(this.binId).subscribe((resp) => {
      this.sensorReadings = resp.sensorReadings
      this.lastSensorReading = this.sensorReadings[0]
      this.wsResponse = this.lastSensorReading
      console.log(this.lastSensorReading);
      this.awaitFetch = true
    })
  }

  sendMsg() {
    this.chatService.messages.next(`{"binID":${this.binId} "message":${this.wsMsg}}`)
  }

  getLiveNotifications() {
    let object = { type: this.wsResponse.notification_type, time: this.wsResponse.time }
    this.notifications.unshift(object)
    this.notifications.pop()
  }

  getNotifications() {
    this.sensorNotification.getTopNotifications(this.binId).subscribe((resp) => {
      this.notifications = resp.notifications;

      console.log(this.notifications);
    })
  }

  openBinDimensionDialog() {
    this.dialog.open(BinDimensionsComponent, {
      width: '50%',
    })
  }

  openEditBin() {
    this.dialog.open(EditBinDialogComponent, {
      width: '20%',
    })
  }

  getBinInfo() {
    this.sensorNotification.getOneBin(this.binId).subscribe(res => {
      this.binTitle = res.bin.name;
    });
  }

  openLogsDialog() {
    this.dialog.open(LogsDialogComponent, {
      width: '30%',
    })
  }
}
