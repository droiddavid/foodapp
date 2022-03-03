import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatabaseService', () => {
	let service: DatabaseService;

	beforeEach(() => {
		TestBed.configureTestingModule({
		imports: [HttpClientTestingModule], 
		providers: [DatabaseService]
	});
	service = TestBed.inject(DatabaseService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
