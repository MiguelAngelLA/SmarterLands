import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BinsService } from '../../services/bins.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

  constructor(private sensorNotification: BinsService) { }

  ngOnInit(): void {
    this.getNotifications()
  }

  getNotifications() {
    this.sensorNotification.getNotifications().subscribe((resp) => {
      console.log(resp);
    })
  }
}
