import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MobileDashService {

  constructor(private http: HttpClient) { }

  public SearchUnMappedPhones(phoneTitle:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/SearchUnMappedPhones?keyword=${phoneTitle}`).pipe();
  }
  
  public getbrands(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/getbrands`).pipe();
  }

  public GetPhonesByBrand(brandId:number,phoneName?:any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/GetPhonesByBrand?brandid=${brandId}&keyword=${phoneName}`).pipe();
  }

  public AddVariant(phoneId:number,color?:string,size?:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/AddVariant?phoneId=${phoneId}&color=${color}&size=${size}`).pipe();
  }

  public MapPhones(MapRequest:any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/phones/MapPhones`, MapRequest).pipe();
  }

}
