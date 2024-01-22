import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/User';


@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  private apiUrl ="http://localhost:8080/users";

  constructor(private http: HttpClient,) {}

  public getUsers(page: number, sortParam: string, searchParam: string): Observable<any> {
    const url = `${this.apiUrl}/getAll?page=${page}${sortParam}${searchParam}`;
    return this.http.get<User[]>(url);
  }

  public addBatchUsers(file: File): Observable<any> {
    const url = `${this.apiUrl}/uploadJson`;
    const formData = new FormData();
    formData.append('file',file,file.name);
    return this.http.post(url,formData, {observe: 'response',responseType: 'text'});
  } 
}
