import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Day } from '@shared/interfaces/dayInterface';
import { User } from '@shared/interfaces/userInterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private readonly API_URL = environment.dayUrl;

  constructor(private http: HttpClient) { }

  getDay() {
    return this.http.get<Day[]>(this.API_URL);
  }

  getDayByIdAndDate(id: number, date: Date) {
    return this.http.get<Day>(`${this.API_URL}/${id}`);
  }
  
  createDay(day: Day) {
    return this.http.post<Day>(this.API_URL, day);
  }

  updateDay(day: Day) {
    return this.http.put<Day>(`${this.API_URL}/${day.id}`, day);
  }
}
