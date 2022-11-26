import { Component, Input, OnInit } from '@angular/core';
import { Bin } from './interfaces/bins.interface';
import { BinsService } from './services/bins.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smarterlanda-App';

}