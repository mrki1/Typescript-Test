import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class CommService {
 private subject = new Subject<any>();

 sendDataCall() {
    this.subject.next();
 }

 getDataCall(): Observable<any> {
    return this.subject.asObservable();
 }
}
