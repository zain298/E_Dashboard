import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get("https://testing-spring-app.herokuapp.com/news/all");
  }
}
