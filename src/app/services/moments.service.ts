import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Moment } from '../Moments';
import { MomentsInitial } from '../model/moments';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  private readonly API = 'api/moments';
  // private baseApiUrl = environment.baseApiUrl
  // private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private httpClient: HttpClient) { }

  createMoment(formData: FormData): Observable<Moment> {
     return this.httpClient.post<Moment>(this.API, formData);
  }

//   private create(record: Partial<Moment>){
//     return this.httpClient.post<Moment>(this.API, record).pipe(first());
//  }

}
