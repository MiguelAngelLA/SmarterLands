import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { BinsService } from '../../services/bins.service';

import { Bin } from 'src/app/interfaces/bins.interface';
import { SidebarDialogComponent } from './sidebar-dialog/sidebar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCropTableComponent } from './add-crop-table/add-crop-table.component';
import { InformationService } from 'src/app/services/information.service';
import { pipe, switchMap } from 'rxjs';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private binsService: BinsService, private infService: InformationService, private dialog: MatDialog) { }
  bins: any = [];
  selectedId: number = 0;
  crops: Bin[] = [];
  bin!: Bin;
  x: any;
  ngOnInit(): void {
    this.getBins()

  }

  getBins() {
    this.binsService.getBins().subscribe((resp => {
      this.bins = resp.bins
      this.infService.sendBin(this.bins[0].id)
    }))

  }

  setSelected(id: number) {
    this.selectedId = id;
    this.infService.sendBin(this.selectedId)

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

  openTableDialog() {
    this.dialog.open(AddCropTableComponent, {
    })
  }
}


