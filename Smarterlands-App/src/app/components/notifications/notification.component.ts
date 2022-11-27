import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BinsService } from '../../services/bins.service';
import { BinDimensionsComponent } from './bin-dimensions/bin-dimensions.component';
import { MatDialog } from '@angular/material/dialog';
import { InformationService } from '../../services/information.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {
  susbcription1$!: Subscription
  binId: any;
  message!: any;
  type!: any;
  time!: any;
  notifications: any;
  constructor(private changeDetector: ChangeDetectorRef, private sensorNotification: BinsService, private infService: InformationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.binId = resp
        this.getNotifications()
      })
    })



  }

  getNotifications() {
    this.sensorNotification.getNotifications(this.binId).subscribe((resp) => {
      this.notifications = resp.notifications;
      this.message = resp.notifications[0].message;
      this.type = resp.notifications[0].type;
      this.time = resp.notifications[0].time
      this.changeDetector.detectChanges();
      console.log(this.notifications);
    })
  }

  openBinDimensionDialog() {
    this.dialog.open(BinDimensionsComponent, {
      width: '50%',
    })
  }
}
