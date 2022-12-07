import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { BinsService } from 'src/app/services/bins.service';
import * as alertify from 'alertifyjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-bin-dialog',
  templateUrl: './delete-bin-dialog.component.html',
  styleUrls: ['./delete-bin-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteBinDialogComponent implements OnInit {

  constructor(
    private apiService: BinsService,
    @Inject(MAT_DIALOG_DATA) public deleteData: number,
  ) { }

  ngOnInit(): void {
  }

  deleteBin(){
    this.apiService.deleteBin(this.deleteData).subscribe({
      next: (res) => {
        if (res.status != 0){
          alertify.set('notifier','position', 'top-center');
          alertify.error(`Error deleting bin. ErrorMessage: ${res.message}`);
        }
        else{
          alertify.set('notifier','position', 'top-center');
          alertify.success('Deleted bin successfully.');
          setTimeout(()=>{
            window.location.reload();
          }, 1500)
        }
      },
      error: () => {
        alertify.set('notifier','position', 'top-center');
        alertify.error('Error while accessing database');
      }
    })
  }

}
