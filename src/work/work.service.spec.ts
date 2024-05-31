import { Test, TestingModule } from '@nestjs/testing';
import { WorkService } from './work.service';

describe('WorkService', () => {
  let service: WorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkService],
    }).compile();

    service = module.get<WorkService>(WorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
