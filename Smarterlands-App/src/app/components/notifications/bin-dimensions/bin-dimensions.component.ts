import { Component, OnInit } from '@angular/core';
import { BinsService } from 'src/app/services/bins.service';
@Component({
  selector: 'app-bin-dimensions',
  templateUrl: './bin-dimensions.component.html',
  styleUrls: ['./bin-dimensions.component.css']
})


export class BinDimensionsComponent implements OnInit {
  columnArray :any;
  rowArray :any;
  colums :any;
  rows:any;

  woosh: Boolean = false;
  constructor( private api : BinsService ) { }

  ngOnInit(): void {
    this.api.getBins().subscribe( res => {
      this.colums= res.bins[1].width_dimension;
      this.rows = res.bins[1].height_dimension;
      this.setDimension();
    });

  }

  setDimension(){
    this.columnArray = [];
    this.rowArray = [];

    for(let i = 0; i < this.colums; i++){
      this.columnArray.push(i);
    }
    for(let i = 1; i < this.rows; i++){
      this.rowArray.push(i);
    }
  }

  moveBin(){
    this.woosh=!this.woosh;
  }

}
