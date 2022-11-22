import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BinsService } from 'src/app/services/bins.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  cropForm!: FormGroup;
  actionButton: string = "Save";
  selectedImage: string = "https://localhost:7137/assets/crops/no-photo.png"
  constructor(private formBuilder: FormBuilder, private api: BinsService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<DialogComponent>) { }

  photosArray: any;
  borderHolder:any;

  ngOnInit(): void {
    this.cropForm = this.formBuilder.group({
      name: ['', Validators.required],
      optimal_moisture: ['', Validators.required],
      description: ['', Validators.required],
      optimal_temperature: ['', Validators.required],
    });



    if (this.editData) {
      this.actionButton = "Edit"
      this.cropForm.controls['name'].setValue(this.editData.name);
      this.cropForm.controls['description'].setValue(this.editData.description);
      this.cropForm.controls['optimal_moisture'].setValue(this.editData.optimal_moisture);
      this.cropForm.controls['optimal_temperature'].setValue(this.editData.optimal_temperature);
    }

    this.getPhotos();

  }

  addCrop() {
    if (!this.editData) {
      if (this.cropForm.valid) {
        this.api.postCrop(this.cropForm.value, this.selectedImage).subscribe({
          next: (res) => {
            alert("Crop Added sucessfully");
            this.cropForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert("Error while adding the crop");
          }
        })
      }
    }
    else {
      this.editCrop()
    }

  }

  editCrop() {
    this.api.putCrop(this.cropForm.value, this.editData.id, this.selectedImage).subscribe({
      next: (res) => {
        alert("Crop Edited")
        console.log(res);
        this.cropForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert("Error while editing the crop")
        console.log(err);
      }
    })
  }

  getPhotos() {
    this.api.getPhotos().subscribe(resp => {
      this.photosArray = resp.photos;
    });
  }

  selectImage(image: any) {
    this.selectedImage = image;
    this.borderHolder = image;
  }
}
