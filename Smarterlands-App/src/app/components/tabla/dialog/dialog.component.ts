import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BinsService } from 'src/app/services/bins.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InformationService } from '../../../services/information.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  susbcription1$!: Subscription
  cropForm!: FormGroup;
  actionButton: string = "Save";
  selectedImage: string = "https://localhost:7137/assets/crops/no-photo.png"
  show : Boolean = true;
  constructor(private formBuilder: FormBuilder, private infService: InformationService, private api: BinsService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<DialogComponent>) { }
  test: any;
  photosArray: any;
  borderHolder: any;
  cropsArray:any;
  selectedCrop:any;
  binID:any;

  dialogTitle: String = "Add a crop to bin";
  ngOnInit(): void {
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.test
        this.binID = resp;
      })
        ,
        10000
    });

    this.api.getCrop().subscribe( res =>{
      this.cropsArray = res.crops;
      console.log(this.cropsArray);
    });
    this.cropForm = this.formBuilder.group({
      quantity: ['', Validators.required],
    });

    if (this.editData) {
      console.log(this.editData);
      this.actionButton = "Remove"
      this.dialogTitle = "Remove crop quantity"
      this.show = false;
      this.cropForm.controls['quantity'].setValue(this.editData.quantity);
    }
}

addCrop() {
  if(!this.editData){
    this.api.postBinCrop(this.binID,this.selectedCrop,this.cropForm.value).subscribe({
      next: (res) => {
        alertify.set('notifier','position', 'top-center');
        alertify.success('Crop added successfully');
        this.cropForm.reset();
        this.dialogRef.close('save');
      },
      error: (err) => {
        alertify.set('notifier','position', 'top-center');
        alertify.error('Error while adding the crop');
      }
    })
  }else{
    this.removeCrop();
  }

}

removeCrop(){
   this.api.postRemoveBinCrop(this.binID,this.editData.crop_id,this.cropForm.value).subscribe({
     next: (res) => {
      alertify.set('notifier','position', 'top-center');
      alertify.success('Crop Removed sucessfully');
       this.cropForm.reset();
       this.dialogRef.close('update');
     },
     error: (err) => {
      alertify.set('notifier','position', 'top-center');
      alertify.error('Error while adding the crop');
     }
   })
}

saveSelectedCrop(item:any){
  this.selectedCrop = item;
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
