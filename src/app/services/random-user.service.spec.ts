import { TestBed } from '@angular/core/testing';

import { RandomUserService } from './random-user.service';
import { BaseRandomUserRepositoryService } from '../repositories/random-user-respository/base-random-user-repository.service';
import { of } from 'rxjs';
import { ApiResponse } from '../models/api.model';
import { User } from '../models/user.model';

const randomUserResponseMock = {
  results: [
    {
      id: {
        name: 'name',
        value: 'value',
      },
    } as User,
  ],
  info: {
    page: 1,
    results: 1,
    seed: '1',
    version: '1',
  },
} satisfies ApiResponse<User[]>;

describe('RandomUserService', () => {
  let service: RandomUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RandomUserService,
        {
          provide: BaseRandomUserRepositoryService,
          useValue: {
            getRandomUser: () => of(randomUserResponseMock),
          } satisfies BaseRandomUserRepositoryService,
        },
      ],
    }).runInInjectionContext(() => {
      service = TestBed.inject(RandomUserService);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a random user', (done) => {
    const getRandomUserSpy = spyOn(
      service['randomUserRepositoryService'],
      'getRandomUser',
    ).and.returnValue(of(randomUserResponseMock));

    service.getRandomUser().subscribe((result) => {
      expect(getRandomUserSpy).toHaveBeenCalled();
      expect(result).toBe(randomUserResponseMock.results[0]);
      done();
    });
  });
});
