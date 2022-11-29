import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinsService } from '../../../../services/bins.service';
import { InformationService } from '../../../../services/information.service';
import { Notification } from '../../../../interfaces/notifications.interface';

@Component({
  selector: 'app-logs-dialog',
  templateUrl: './logs-dialog.component.html',
  styleUrls: ['./logs-dialog.component.css']
})
export class LogsDialogComponent implements OnInit {
  binId!: number
  notifications: any
  susbcription1$!: Subscription
  constructor(private api: BinsService, private infService: InformationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe((resp) => {
        this.binId = resp;
        this.getNotifications();
      })
    })
  }


  getNotifications() {
    this.api.getNotifications(this.binId).subscribe((resp) => {
      this.notifications = resp.notifications
    })
  }


}
