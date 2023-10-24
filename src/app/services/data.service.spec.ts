import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { User } from '../model';

describe('DataService', () => {
  let service: DataService<User>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
