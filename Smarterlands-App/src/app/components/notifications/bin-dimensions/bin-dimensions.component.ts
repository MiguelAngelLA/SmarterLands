import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BinsService } from 'src/app/services/bins.service';
@Component({
  selector: 'app-bin-dimensions',
  templateUrl: './bin-dimensions.component.html',
  styleUrls: ['./bin-dimensions.component.css']
})


export class BinDimensionsComponent implements OnInit {
  columnArray: any;
  rowArray: any;
  columns: any;
  rows: any;

  woosh: Boolean = false;
  cropsQuantity: number = 0;
  colorArray: any[] = [];

  constructor(private api: BinsService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.getBins().subscribe( res => {
      this.columns = res.bins[0].width_dimension;
      this.rows = res.bins[0].height_dimension;
      this.cropsQuantity = res.bins[0].total_capacity - res.bins[0].remaining_capacity;
      this.setDimension();
    });
  }

  setDimension(): void{
    this.columnArray = [];
    this.rowArray = [];

    for(let i = 0; i < this.columns * this.rows; i++){
      this.columnArray.push(i);
    }

    for(let i = 0; i < this.rows; i++){
      this.rowArray.push(i);
    }
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
