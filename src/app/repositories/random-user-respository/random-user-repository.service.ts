import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@app/models/api.model';
import { Observable } from 'rxjs';
import { BaseRandomUserRepositoryService } from './base-random-user-repository.service';
import { User } from '@app/models/user.model';
import { API } from 'app/app.config';

@Injectable({
  providedIn: 'root',
})
export class RandomUserRepositoryService extends BaseRandomUserRepositoryService {
  private httpClient = inject(HttpClient);

  getRandomUser(): Observable<ApiResponse<User[]>> {
    return this.httpClient.get<ApiResponse<User[]>>(API);
  }
}
