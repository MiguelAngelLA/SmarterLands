import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { BinsService } from 'src/app/services/bins.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bin } from '../../interfaces/bins.interface';
import { InformationService } from 'src/app/services/information.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class TablaComponent implements OnInit {
  susbcription1$!: Subscription
  displayedColumns: string[] = ['photo', 'name', 'description', 'optimal_moisture', 'optimal_temperature', 'quantity', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  test: any;
  constructor(private dialog: MatDialog, private api: BinsService, private infService: InformationService) { }

  cropData: any;
  binID: any;
  ngOnInit(): void {

    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.binID = resp;
        this.getAllCrops();
      })
        ,
        10000
    })
  }

  AddCrops() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllCrops();
      }
    })
  }

  getAllCrops() {
    this.api.getBinsId(this.binID).subscribe({
      next: (res) => {
        this.cropData = res.bins
        this.dataSource = new MatTableDataSource(this.cropData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {

      }
    })
  }

  editCrop(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: '90%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllCrops();
      }
    })
  }

  deleteCrop(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllCrops();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
