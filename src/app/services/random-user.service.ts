import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@app/models/api.model';
import { User } from '@app/models/user.model';
import { BaseRandomUserRepositoryService } from '@app/repositories/random-user-respository/base-random-user-repository.service';
import { Observable, map } from 'rxjs';

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
