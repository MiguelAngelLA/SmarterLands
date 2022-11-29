import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BinsService } from '../../../services/bins.service';

@Component({
  selector: 'app-sidebar-dialog',
  templateUrl: './sidebar-dialog.component.html',
  styleUrls: ['./sidebar-dialog.component.css']
})
export class SidebarDialogComponent implements OnInit {
  binForm!: FormGroup;
  actionButton: string = "Save";
  constructor(private dialog: MatDialog, private api: BinsService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<SidebarDialogComponent>) { }

  ngOnInit(): void {
    this.binForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      width_dimension: ['', Validators.required],
      height_dimension: ['', Validators.required],
    });
  }

  addBin() {
    if (this.binForm.valid) {
      this.api.postBin(this.binForm.value).subscribe({
        next: (res) => {
          alert("Bin Added sucessfully");
          this.binForm.reset();
          this.dialogRef.close('save');
          console.log(res);
        },
        error: (err) => {
          alert("Error while adding the bin");
        }
      })
    }
  }
}
