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




@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],

})
export class NotificationComponent implements OnInit {

  susbcription1$!: Subscription
  binId: any;
  wsMsg: any = "stop";
  type!: any;
  time!: any;
  notifications: any;
  sensorReadings!: SensorReading[];
  lastSensorReading!: SensorReading
  awaitFetch: boolean = false
  binTitle: any;
  constructor(private chatService: ChatService, private sensorNotification: BinsService, private infService: InformationService, private dialog: MatDialog) {
    this.chatService.messages.subscribe((msg: any) => {
      console.log("Response from ws:" + JSON.stringify(msg));
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
      // console.log(this.lastSensorReading);
      this.awaitFetch = true
    })
  }

  sendMsg() {

    this.chatService.messages.next(`{"binID":${this.binId} "message":${this.wsMsg}}`)
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
