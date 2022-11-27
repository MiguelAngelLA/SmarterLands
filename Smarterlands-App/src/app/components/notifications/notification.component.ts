import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BinsService } from '../../services/bins.service';
import { BinDimensionsComponent } from './bin-dimensions/bin-dimensions.component';
import { MatDialog } from '@angular/material/dialog';
import { InformationService } from '../../services/information.service';
import { Subscription } from 'rxjs';
import { WebsocketsService } from '../../services/websockets.service';
import { ChatService } from '../../services/chat.service';




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
  constructor(private chatService: ChatService, private changeDetector: ChangeDetectorRef, private webSocket: WebsocketsService, private sensorNotification: BinsService, private infService: InformationService, private dialog: MatDialog) {
    this.chatService.messages.subscribe((msg: any) => {
      console.log("Response from ws:" + JSON.stringify(msg));
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.binId = resp
        this.getNotifications()
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
}
