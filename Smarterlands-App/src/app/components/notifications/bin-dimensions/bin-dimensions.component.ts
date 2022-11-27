import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BinsService } from 'src/app/services/bins.service';
import { BinCustom } from 'src/app/interfaces/bins.interface';
import * as alertify from 'alertifyjs';
import { InformationService } from 'src/app/services/information.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-bin-dimensions',
  templateUrl: './bin-dimensions.component.html',
  styleUrls: ['./bin-dimensions.component.css']
})

export class BinDimensionsComponent implements OnInit {
  susbcription1$!: Subscription
  columnArray: any;
  rowArray: any;
  columns: any;
  rows: any;
  cropLength:any;
  binId:any;
  binName:any;
  binDesc:any;


  occupied:Boolean = false;

  tempArray:any;

  tempColumns:any;

  woosh: Boolean = false;
  cropsQuantity: number = 5;
  colorArray: any[] = [];
  binID: any;

  constructor(private api: BinsService, private cdRef: ChangeDetectorRef, private infService: InformationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.susbcription1$ = this.infService.selectedBin$.subscribe(resp => {
        this.binID = resp;
        this.api.getOneBin(this.binID).subscribe( res => {
          console.log(res.bin.id);
           this.binId = res.bin.id;
           this.binName = res.bin.name;
           this.binDesc = res.bin.description;
           this.columns = res.bin.width_dimension;
           this.rows = res.bin.height_dimension;
           this.cropsQuantity = res.bin.total_capacity - res.bin.remaining_capacity;
           this.setDimension();
        });
      })
        ,
        10000
    })
  }

  setDimension(): void{
    this.columnArray = [];
    this.rowArray = [];

    this.tempColumns = this.columns;
    for(let i = 0; i < this.columns * this.rows; i++){
      this.columnArray.push(i);
    }

    for(let i = 0; i < this.rows; i++){
      this.rowArray.push(i);
    }
  }

  setDimensionAction(): void{
    this.columnArray = [];
    this.rowArray = [];
    let bin : BinCustom = {
      id: 0,
      name: '',
      description: '',
      width_dimension: 0,
      height_dimension: 0
    };
    bin.id = this.binId;
    bin.name = this.binName;
    bin.description = this.binDesc;
    bin.width_dimension = this.columns;
    bin.height_dimension = this.rows;

    this.tempColumns = this.columns;
    for(let i = 0; i < this.columns * this.rows; i++){
      this.columnArray.push(i);
    }

    for(let i = 0; i < this.rows; i++){
      this.rowArray.push(i);
    }

    console.log(bin.id);

    this.api.putDimension(bin).subscribe({
       next: (res) =>{
        alertify.set('notifier','position', 'top-center');
        alertify.success('Changed successfully');
       },
       error: (err) =>{
        alertify.error("There has been a problem");
       }
     })
  }
  checkBin(item: number): boolean{
    let array = [...Array(this.cropsQuantity).keys()]
    if (array.includes(item)){
      return true;
    }
    return false;
  }

  moveBin(): void{
    this.woosh =! this.woosh;
  }

}
