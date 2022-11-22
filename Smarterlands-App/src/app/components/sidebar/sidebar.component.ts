import { Component, OnInit, Inject } from '@angular/core';
import { BinsService } from '../../services/bins.service';

import { Bin } from 'src/app/interfaces/bins.interface';
import { SidebarDialogComponent } from './sidebar-dialog/sidebar-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private binsService: BinsService, private dialog: MatDialog) { }
  bins: Bin[] = [];
  selectedId: number = 0;

  ngOnInit(): void {
    this.binsService.getBins().subscribe(resp => {
      this.bins = resp.bins;
      console.log(this.bins[0].date_created)
    })

  }

  setSelected(id: number) {
    this.selectedId = id;
  }


  createBin() {
    this.dialog.open(SidebarDialogComponent, {

      width: '30%'
    })

  }
}


