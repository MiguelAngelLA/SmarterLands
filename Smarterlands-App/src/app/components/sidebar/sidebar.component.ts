import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { BinsService } from '../../services/bins.service';

import { Bin } from 'src/app/interfaces/bins.interface';
import { SidebarDialogComponent } from './sidebar-dialog/sidebar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InformationService } from '../../services/information.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private binsService: BinsService, private infService: InformationService, private dialog: MatDialog) { }
  bins: Bin[] = [];
  selectedId: number = 0;
  crops: Bin[] = [];
  bin!: Bin;

  ngOnInit(): void {
    this.getBins()
  }




  getBins() {
    this.binsService.getBins().subscribe((res) => {
      this.bins = res.bins;
      // console.log(this.bins[0].date_created)
    })

  }

  setSelected(id: number) {
    this.selectedId = id;
    this.binsService.getBinsId(this.selectedId).subscribe((res) => {
      this.crops = res.bins;
      this.infService.sendCrop(this.crops)
      // console.log(this.binsService);
    })
  }


  createBin() {
    this.dialog.open(SidebarDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getBins();
      }
    })

  }
}


