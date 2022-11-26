import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private crop$ = new BehaviorSubject<any>({})
  selectedCrop$ = this.crop$.asObservable();
  constructor() { }

  sendCrop(crop: any) {
    this.crop$.next(crop)
  }
}
