import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private bin$ = new BehaviorSubject<any>({})
  selectedBin$ = this.bin$.asObservable();

  private cropsInBin$ = new BehaviorSubject<any>({})
  selectedBins$ = this.cropsInBin$.asObservable();
  constructor() { }

  sendBin(bin: any) {
    this.bin$.next(bin)
  }


}
