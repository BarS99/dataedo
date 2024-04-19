import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RandomUserRepositoryService } from './random-user-repository.service';
import { API } from '../../app.config';
import { User } from '../../models/user.model';
import { ApiResponse } from '../../models/api.model';

describe('RandomUserRepositoryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: RandomUserRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomUserRepositoryService],
      imports: [HttpClientTestingModule],
    }).runInInjectionContext(() => {
      service = TestBed.inject(RandomUserRepositoryService);
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return random user response', () => {
    const responseMock = {} as ApiResponse<User[]>;
    let response: ApiResponse<User[]> | undefined;

    service.getRandomUser().subscribe((data) => {
      response = data;
    });

    const req = httpTestingController.expectOne(API);
    req.flush(responseMock);
    expect(response).toEqual(responseMock);
  });
});
