import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BinsService } from '../../services/bins.service';
import { BinDimensionsComponent } from './bin-dimensions/bin-dimensions.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

  constructor(private sensorNotification: BinsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotifications()
  }

  getNotifications() {
    this.sensorNotification.getNotifications().subscribe((resp) => {
      console.log(resp);
    })
  }

  openBinDimensionDialog(){
    this.dialog.open(BinDimensionsComponent, {
      width: '30%',
      // height:'90%',
    })
  }
}
