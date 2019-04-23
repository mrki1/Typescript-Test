import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Bookmark } from '../../models/models';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookmarkService {

  constructor(private http: HttpClient) { }

  getAllBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>('/api/Bookmark/GetAllBookmarks')
      .map((res: any) => {
        console.log("res");
        console.log(res);
        return res;
        //return res.json() as WorkingHours;
      });
  }

  createBookmark(data:any): Observable<any> {
    return this.http.post<any>('/api/Bookmark/CreateBookmark', data)
      .map((res: any) => {
        console.log("res");
        console.log(res);
        return res;
        //return res.json() as WorkingHours;
      });
  }
}
