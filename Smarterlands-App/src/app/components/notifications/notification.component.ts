import { Component, OnInit } from '@angular/core';
import { BinsService } from '../../services/bins.service';
import { BinDimensionsComponent } from './bin-dimensions/bin-dimensions.component';
import { MatDialog } from '@angular/material/dialog';
import { InformationService } from '../../services/information.service';
import { Subscription } from 'rxjs';
import { WebsocketsService } from '../../services/websockets.service';
import { ChatService } from '../../services/chat.service';
import { EditBinDialogComponent } from './edit-bin-dialog/edit-bin-dialog.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],

})
export class NotificationComponent implements OnInit {

  susbcription1$!: Subscription
  binId: any;
  message: any = "stop";
  type!: any;
  time!: any;
  lastThree!: any;
  notifications: any;
  binTitle:any;

  constructor(
      private chatService: ChatService,
      private webSocket: WebsocketsService,
      private sensorNotification: BinsService,
      private infService: InformationService,
      private dialog: MatDialog
    ) {
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
      })
    })
  }

  sendMsg() {
    this.chatService.messages.next(`${this.binId} ${this.message}`)
  }

  getNotifications() {
    this.sensorNotification.getNotifications(this.binId).subscribe((resp) => {
      this.notifications = resp.notifications;
      this.lastThree = this.notifications.slice(0, 3)
      this.time = this.lastThree[0].time
      console.log(this.lastThree);
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

  getBinInfo(){
    this.sensorNotification.getOneBin(this.binId).subscribe(res => {
      this.binTitle = res.bin.name;
    });
  }
}
