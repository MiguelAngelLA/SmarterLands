import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { BinsService } from 'src/app/services/bins.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaComponent implements OnInit {
  displayedColumns: string[] = ['photo','name', 'description', 'optimal_moisture', 'optimal_temperature'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : BinsService) { }

  cropData:any;
  ngOnInit(): void {
    this.getAllCrops();
  }

  openModal() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }

  getAllCrops(){
    this.api.getCrop().subscribe({
      next : (res) =>{
        this.cropData = res.crops;
        this.dataSource = new MatTableDataSource(this.cropData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : (err) =>{
        alert("Weeo Weeo Error brrrrrrr")
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
