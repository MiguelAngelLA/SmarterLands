import { Component, OnInit } from '@angular/core';
import { BinsService } from '../../services/bins.service';
import { Bin } from '../../interfaces/bins.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private binsService: BinsService) { }
  bins: Bin[] = [];
  selectedId: number = 0;

  ngOnInit(): void {
    this.binsService.getBins().subscribe(resp => {
      this.bins = resp.bins;
      console.log(this.bins[0].date_created)
    })

  }

  setSelected(id: number) {
    this.selectedId = id;
  }


}
