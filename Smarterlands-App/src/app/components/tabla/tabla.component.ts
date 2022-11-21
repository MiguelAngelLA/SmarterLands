import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
