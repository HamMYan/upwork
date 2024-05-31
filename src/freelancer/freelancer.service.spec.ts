import { Test, TestingModule } from '@nestjs/testing';
import { FreelancerService } from './freelancer.service';

describe('FreelancerService', () => {
  let service: FreelancerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreelancerService],
    }).compile();

    service = module.get<FreelancerService>(FreelancerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
