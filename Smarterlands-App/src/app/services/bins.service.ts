import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bins } from '../interfaces/bins.interface';

@Injectable({
  providedIn: 'root'
})
export class BinsService {

  baseUrl = "https://localhost:7137/api";

  constructor(private http: HttpClient) { }

  getBins(): Observable<Bins[]> {
    return this.http.get<Bins[]>(`${this.baseUrl}/bin`)
  }

  postCrop(data : any){
    return this.http.post<any>(`${this.baseUrl}/crops`,data);
  }

  getCrop(){
    return this.http.get<any>(`${this.baseUrl}/crops`)
  }


}
