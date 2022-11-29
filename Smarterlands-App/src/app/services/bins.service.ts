import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bins, Bin, BinCustom, SingleBin } from '../interfaces/bins.interface';
import { GenericResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class BinsService {
  baseUrl = "/api";

  public crops: Bin[] = [];

  constructor(private http: HttpClient) { }

  getBins(): Observable<Bins> {
    return this.http.get<Bins>(`${this.baseUrl}/bin`)
  }

  getOneBin(id: number): Observable<SingleBin> {
    return this.http.get<SingleBin>(`${this.baseUrl}/bin/${id}`);
  }

  getBinsId(id: number): Observable<Bins> {
    return this.http.get<Bins>(`${this.baseUrl}/bin/crops/${id}`);
  }

  postBin(bin: Bin) {
    var formData: any = new FormData();
    formData.append('name', bin.name)
    formData.append('description', bin.description)
    formData.append('width_dimension', bin.width_dimension)
    formData.append('height_dimension', bin.height_dimension)
    return this.http.post<GenericResponse>(`${this.baseUrl}/bin`, formData)
  }

  postCrop(data: any, image: string) {
    var formData: any = new FormData();
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('photo', image)
    formData.append('optimal_moisture', data.optimal_moisture)
    formData.append('optimal_temperature', data.optimal_temperature)
    return this.http.post<GenericResponse>(`${this.baseUrl}/crops`, formData);
  }

  putCrop(data: any, data2: any, image: string) {
    var formData: any = new FormData();
    formData.append('id', data2)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('photo', image)
    formData.append('optimal_moisture', data.optimal_moisture)
    formData.append('optimal_temperature', data.optimal_temperature)
    return this.http.put<GenericResponse>(`${this.baseUrl}/crops`, formData);
  }

  deleteCrop(data: any) {
    return this.http.delete<GenericResponse>(`${this.baseUrl}/crops/` + data);
  }

  getCrop() {
    return this.http.get<any>(`${this.baseUrl}/crops`)
  }

  getPhotos() {
    return this.http.get<any>(`${this.baseUrl}/photos`)
  }

  getNotifications(id: any) {
    return this.http.get<any>(`${this.baseUrl}/Notifications/${id}`)
  }

  postBinCrop(bin: any, crop: any, data: any){
    var formData: any = new FormData();
    formData.append('bin_id',bin);
    formData.append('crop_id',crop);
    formData.append('quantity',data.quantity);
    return this.http.post<GenericResponse>(`${this.baseUrl}/bin/AddCrop`,formData)
  }

  postRemoveBinCrop(bin: any, crop: any, data: any){
    var formData: any = new FormData();
    formData.append('bin_id',bin);
    formData.append('crop_id',crop);
    formData.append('quantity',data.quantity);
    return this.http.post<GenericResponse>(`${this.baseUrl}/bin/RemoveCrop`,formData)
  }

  putDimension(bin: BinCustom){
    var formData: any = new FormData();
    formData.append('id', bin.id);
    formData.append('name', bin.name);
    formData.append('description', bin.description);
    formData.append('width_dimension', bin.width_dimension);
    formData.append('height_dimension', bin.height_dimension);
    return this.http.put<GenericResponse>(`${this.baseUrl}/bin`, formData)
  }
}
