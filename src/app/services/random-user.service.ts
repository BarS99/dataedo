import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../models/api.model';
import { User } from '../models/user.model';
import { Observable, map } from 'rxjs';
import { BaseRandomUserRepositoryService } from '../repositories/random-user-respository/base-random-user-repository.service';

@Injectable({
  providedIn: 'root',
})
export class RandomUserService {
  private randomUserRepositoryService = inject(BaseRandomUserRepositoryService);

  public getRandomUser(): Observable<User | null> {
    return this.randomUserRepositoryService
      .getRandomUser()
      .pipe(
        map((response) => this.convertGetRandomUserResponseToUser(response)),
      );
  }

  private convertGetRandomUserResponseToUser(
    response: ApiResponse<User[]>,
  ): User | null {
    return response.results?.[0] ?? null;
  }
}
