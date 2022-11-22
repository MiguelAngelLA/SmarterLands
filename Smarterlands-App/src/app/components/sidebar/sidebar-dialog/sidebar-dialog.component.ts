import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BinsService } from '../../../services/bins.service';

@Component({
  selector: 'app-sidebar-dialog',
  templateUrl: './sidebar-dialog.component.html',
  styleUrls: ['./sidebar-dialog.component.css']
})
export class SidebarDialogComponent implements OnInit {
  binForm!: FormGroup;

  constructor(private dialog: MatDialog, private api: BinsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
