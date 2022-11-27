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
  constructor(private changeDetector: ChangeDetectorRef, private sensorNotification: BinsService, private infService: InformationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotifications()


  }

  getNotifications() {
    this.sensorNotification.getNotifications(1000).subscribe((resp) => {
      this.message = resp.notifications[0].message;
      this.type = resp.notifications[0].type;
      this.time = resp.notifications[0].time
      this.changeDetector.detectChanges();
      console.table([this.message, this.type, this.time]);
    })
  }

  openBinDimensionDialog() {
    this.dialog.open(BinDimensionsComponent, {
      width: '30%',
      height:'90%',
    })
  }
}
