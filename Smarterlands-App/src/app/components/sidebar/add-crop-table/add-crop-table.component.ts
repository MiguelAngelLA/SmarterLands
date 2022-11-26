import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BinsService } from 'src/app/services/bins.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCropDialogComponent } from './add-crop-dialog/add-crop-dialog.component';

@Component({
  selector: 'app-add-crop-table',
  templateUrl: './add-crop-table.component.html',
  styleUrls: ['./add-crop-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCropTableComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'name', 'description', 'optimal_moisture', 'optimal_temperature', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: BinsService) { }

  cropData: any;
  ngOnInit(): void {
    this.getAllCrops();
  }

  openModal() {
    this.dialog.open(AddCropDialogComponent, {
      height:'90%',
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
    this.dialog.open(AddCropDialogComponent, {
      width: '30%',
      height:'90%',
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
