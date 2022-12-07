import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private bin$ = new BehaviorSubject<any>({})
  selectedBin$ = this.bin$.asObservable();

  private graph$ = new BehaviorSubject<any>({})
  streamedGraph$ = this.graph$.asObservable();
  constructor() { }

  sendBin(bin: any) {
    this.bin$.next(bin)
  }

  sendGraph(graph: any) {
    this.graph$.next(graph)
  }
}
