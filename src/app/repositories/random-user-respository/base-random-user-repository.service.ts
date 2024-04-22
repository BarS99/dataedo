import { ApiResponse } from '@app/models/api.model';
import { User } from '@app/models/user.model';
import { Observable } from 'rxjs';

export abstract class BaseRandomUserRepositoryService {
  abstract getRandomUser(): Observable<ApiResponse<User[]>>;
}
