import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, tap } from 'rxjs';

import { Moment } from '../Moments';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  public readonly API = 'api/moments';

  constructor(private httpClient: HttpClient) {}

  getMoments(): Observable<Response<Moment[]>>{
    return this.httpClient.get<Response<Moment[]>>(this.API);
  }

  getMoment(id: number): Observable<Response<Moment>>{

    return this.httpClient.get<Response<Moment>>(`${this.API}/${id}`);
  } 

  createMoment(formData: FormData): Observable<FormData> {
     return this.httpClient.post<FormData>(this.API, formData);
  }

  async removeMoment(id: number){
    const url = `${this.API}/${id}`;
    return this.httpClient.delete(url);
   }

   updateMoment(id: number, formData: FormData): Observable<FormData>{
    const url = `${this.API}/${id}`;
    return this.httpClient.put<FormData>(url, formData);
   }

}
