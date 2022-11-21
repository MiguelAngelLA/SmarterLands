import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BinsService } from 'src/app/services/bins.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  cropForm!:FormGroup;
  constructor(private formBuilder : FormBuilder, private api : BinsService) { }

  ngOnInit(): void {
    this.cropForm = this.formBuilder.group({
      name : ['',Validators.required],
      description : ['',Validators.required],
      photo : ['',Validators.required],
      optimal_moisture : ['',Validators.required],
      optimal_temperature : ['',Validators.required],
    });
  }

  addCrop(){
    if(this.cropForm.valid) {
      this.api.postCrop(this.cropForm.value).subscribe({
        next : (res)=>{
          alert("Crop Added sucessfully");
        },
        error : ()=>{
          alert("Error while adding the crop");
        }
      })
    }
  }
}
