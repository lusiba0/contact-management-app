import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  cellNumber: string;
  bio: string;
  age?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>('assets/contacts.json');
  }
}