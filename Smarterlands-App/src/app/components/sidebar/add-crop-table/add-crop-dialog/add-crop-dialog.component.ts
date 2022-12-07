import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BinsService } from 'src/app/services/bins.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-add-crop-dialog',
  templateUrl: './add-crop-dialog.component.html',
  styleUrls: ['./add-crop-dialog.component.css']
})
export class AddCropDialogComponent implements OnInit {
  cropForm!: FormGroup;
  actionButton: string = "Save";
  selectedImage: string = "https://localhost:7137/assets/crops/no-photo.png";
  constructor(private formBuilder: FormBuilder, private api: BinsService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddCropDialogComponent>) { }
  photosArray: any;
  borderHolder:any;
  formTitle: String = "Add a new crop"
  si : boolean = true;
  ngOnInit(): void {
    this.cropForm = this.formBuilder.group({
      name: ['', Validators.required],
      optimal_moisture: ['', Validators.required],
      description: ['', Validators.required],
      optimal_temperature: ['', Validators.required],
    });



    if (this.editData) {
      this.actionButton = "Edit"
      this.formTitle = "Edit a crop"
      this.cropForm.controls['name'].setValue(this.editData.name);
      this.cropForm.controls['description'].setValue(this.editData.description);
      this.cropForm.controls['optimal_moisture'].setValue(this.editData.optimal_moisture);
      this.cropForm.controls['optimal_temperature'].setValue(this.editData.optimal_temperature);
    }

    this.getPhotos();
  }

  addCrop() {

    if (!this.editData) {
      if (this.cropForm.valid && !this.si==true) {
         this.api.postCrop(this.cropForm.value, this.selectedImage).subscribe({
           next: (res) => {
             alertify.set('notifier','position', 'top-center');
             alertify.success('Crop Added sucessfully');
             this.cropForm.reset();
             this.dialogRef.close('save');
           },
           error: (err) => {
             alertify.set('notifier','position', 'top-center');
             alertify.error('Error while adding the crop');
           }
         })
      }else{
        alertify.set('notifier','position', 'top-center');
        alertify.error('Fields are not correct');
      }
    }
    else {
      this.editCrop()
    }

  }

  editCrop() {
    this.api.putCrop(this.cropForm.value, this.editData.id, this.selectedImage).subscribe({
      next: (res) => {
        alertify.set('notifier','position', 'top-center');
        alertify.success('Crop Edited');
        this.cropForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alertify.set('notifier','position', 'top-center');
        alertify.error('Error while editing the crop');
      }
    })
  }

  getPhotos() {
    this.api.getPhotos().subscribe(resp => {
      this.photosArray = resp.photos;
    });
  }

  selectImage(image: any) {
    this.si=false
    this.selectedImage = image;
    this.borderHolder = image;
  }

  formValidation(input:string) : boolean {
    return(!this.cropForm.get(input)?.valid);
  }

  validationErrors(input:string) : string {
    if(this.cropForm.get(input)?.hasError('required')){
      return 'Please enter required information'
    }
    return 'Eestr egg'
  }

}
