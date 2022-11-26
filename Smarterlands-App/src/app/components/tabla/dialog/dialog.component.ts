import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BinsService } from 'src/app/services/bins.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InformationService } from '../../../services/information.service';
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
  constructor(private formBuilder: FormBuilder, private infService: InformationService, private api: BinsService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<DialogComponent>) { }
  test: any;
  photosArray: any;
  borderHolder: any;
  cropsArray:any;
  selectedCrop:any;

  ngOnInit(): void {
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.test
        console.log(resp)
      })
        ,
        10000
    });

    this.api.getCrop().subscribe( res =>{
      this.cropsArray = res.crops;
    });
    this.cropForm = this.formBuilder.group({
      quantity: ['', Validators.required],
    });
}

addCrop() {
  // this.api.postBinCrop().subscribe({
  //   next: (res) => {
  //     alert("Crop Added sucessfully");
  //     this.cropForm.reset();
  //     this.dialogRef.close('save');
  //   },
  //   error: (err) => {
  //     alert("Error while adding the crop");
  //   }
  // })
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
