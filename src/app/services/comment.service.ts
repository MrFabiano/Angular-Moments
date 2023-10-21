import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../Response';
import { Comment } from '../Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public readonly API = 'api/moments';

  constructor(private http: HttpClient) {}

  createComment(data: Comment): Observable<Response<Comment>>{
    const url = `${this.API}/${data.momentId}/comments`;
    return this.http.post<Response<Comment>>(url, data);
  }
}
