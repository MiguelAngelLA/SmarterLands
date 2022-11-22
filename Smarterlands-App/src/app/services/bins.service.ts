import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bins } from '../interfaces/bins.interface';

@Injectable({
  providedIn: 'root'
})
export class BinsService {

  baseUrl = "/api";

  constructor(private http: HttpClient) { }

  getBins(): Observable<Bins> {
    return this.http.get<Bins>(`${this.baseUrl}/bin`)
  }

  postCrop(data: any, image:string) {
    var formData: any = new FormData();
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('photo', image)
    formData.append('optimal_moisture', data.optimal_moisture)
    formData.append('optimal_temperature', data.optimal_temperature)
    return this.http.post<any>(`${this.baseUrl}/crops`, formData);
  }

  putCrop(data:any, data2:any, image:string){
    var formData: any = new FormData();
    formData.append('id', data2)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('photo', image)
    formData.append('optimal_moisture', data.optimal_moisture)
    formData.append('optimal_temperature', data.optimal_temperature)
    return this.http.put<any>(`${this.baseUrl}/crops`, formData);
  }

  deleteCrop(data:any){
    return this.http.delete<any>(`${this.baseUrl}/crops/` + data);
  }

  getCrop() {
    return this.http.get<any>(`${this.baseUrl}/crops`)
  }

  getPhotos(){
    return this.http.get<any>(`${this.baseUrl}/photos`)
  }


}
