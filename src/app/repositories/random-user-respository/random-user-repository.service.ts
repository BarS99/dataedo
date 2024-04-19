import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../app.config';
import { ApiResponse } from '../../models/api.model';
import { User } from '../../models/user.model';
import { BaseRandomUserRepositoryService } from './base-random-user-repository.service';

@Injectable({
  providedIn: 'root',
})
export class RandomUserRepositoryService extends BaseRandomUserRepositoryService {
  private httpClient = inject(HttpClient);

  getRandomUser(): Observable<ApiResponse<User[]>> {
    return this.httpClient.get<ApiResponse<User[]>>(API);
  }
}
