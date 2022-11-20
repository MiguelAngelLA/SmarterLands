import { Component, OnInit } from '@angular/core';
import { BinsService } from '../../services/bins.service';
import { Bin, Bins } from '../../interfaces/bins.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private binsService: BinsService) { }
  bins: any;
  bin: Bin[] = []

  ngOnInit(): void {
    this.binsService.getBins().subscribe(resp => {
      this.bins = resp;
      this.bin = this.bins.bins
      console.log(this.bin[0].date_created)
    })

  }



}
