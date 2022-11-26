import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { BinsService } from 'src/app/services/bins.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bin } from '../../interfaces/bins.interface';
import { Subscription } from 'rxjs';
import { InformationService } from '../../services/information.service';

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
  ngOnInit(): void {
    this.getAllCrops();
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.test
        console.log(resp)
      })
        ,
        10000
    })
  }

  openModal() {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: '90%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllCrops();
      }
    })
  }

  getAllCrops() {
    this.api.getCrop().subscribe({
      next: (res) => {
        this.cropData = res.crops;
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
    this.api.deleteCrop(row.id).subscribe({
      next: () => {
        alert("Crop deleted")
        this.getAllCrops();
      },
      error: () => {
        alert("Error while deleting the crop")
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
