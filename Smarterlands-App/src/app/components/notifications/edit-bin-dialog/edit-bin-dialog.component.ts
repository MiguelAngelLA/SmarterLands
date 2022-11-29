import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BinsService } from 'src/app/services/bins.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InformationService } from '../../../services/information.service';
import * as alertify from 'alertifyjs';
import { Bin } from 'src/app/interfaces/bins.interface';
@Component({
  selector: 'app-edit-bin-dialog',
  templateUrl: './edit-bin-dialog.component.html',
  styleUrls: ['./edit-bin-dialog.component.css']
})
export class EditBinDialogComponent implements OnInit {

  binEditForm!: FormGroup;
  selectedCrop:any;
  binID: number = 0;
  dialogTitle: String = "Edit Bin";
  susbcription1$!: Subscription;
  cropObject: Bin = {
    id: 0,
    name: '',
    description: '',
    width_dimension: 0,
    height_dimension: 0,
    total_capacity: 0,
    remaining_capacity: 0
  }

  constructor(
    private formBuilder: FormBuilder,
    private api: BinsService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EditBinDialogComponent>,
    private infService: InformationService
  ) { }

  ngOnInit(): void {

    this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
      this.binID = resp;
      this.api.getOneBin(this.binID).subscribe( res => {
        let response = res.bin;
        this.cropObject.id = response.id;
        this.cropObject.name = response.name;
        this.cropObject.description = response.description;
        this.cropObject.width_dimension = response.width_dimension;
        this.cropObject.height_dimension = response.height_dimension;
        this.cropObject.total_capacity = response.total_capacity - response.remaining_capacity;
      });
    })

    this.binEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
}

editCrop() {
    this.api.putDimension(this.cropObject).subscribe({
      next: (res) => {
        if (res.status != 0){
          alertify.set('notifier','position', 'top-center');
          alertify.error(`Error editing bin. ErrorMessage: ${res.message}`);
        }
        else{
          alertify.set('notifier','position', 'top-center');
          alertify.success('Bin Information Saved Successfully');
          this.binEditForm.reset();
          this.dialogRef.close('save');
          this.infService.sendBin(this.cropObject.id);
        }
      },
      error: (err) => {
        alertify.set('notifier','position', 'top-center');
        alertify.error('Error while accessing database');
      }
    })
  }
}
