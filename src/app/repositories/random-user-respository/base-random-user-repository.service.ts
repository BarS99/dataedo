import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { User } from '../../models/user.model';

export abstract class BaseRandomUserRepositoryService {
  abstract getRandomUser(): Observable<ApiResponse<User[]>>;
}
