import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { WeightDay } from '@shared/interfaces/weightDayInterface';

@Injectable({
  providedIn: 'root'
})
export class WeightDayService {
  private readonly API_URL = environment.weightDayUrl;

  constructor(private http: HttpClient) { }

  getWeightDays() {
    return this.http.get<WeightDay[]>(this.API_URL);
  }

  getWeightDaysByUserId(userId: number) {
    return this.http.get<WeightDay[]>(`${this.API_URL}/${userId}`);
  }

  createWeightDay(weightDay: WeightDay) {
    return this.http.post<WeightDay>(this.API_URL, weightDay);
  }

  updateWeightDay(weightDay: WeightDay) {
    return this.http.put<WeightDay>(`${this.API_URL}/${weightDay.id}`, weightDay);
  }

  deleteWeightDay(weightDay: WeightDay) {
    return this.http.delete(`${this.API_URL}/${weightDay.id}`);
  }
}
