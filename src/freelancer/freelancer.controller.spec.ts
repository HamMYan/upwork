import { Test, TestingModule } from '@nestjs/testing';
import { FreelancerController } from './freelancer.controller';
import { FreelancerService } from './freelancer.service';

describe('FreelancerController', () => {
  let controller: FreelancerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreelancerController],
      providers: [FreelancerService],
    }).compile();

    controller = module.get<FreelancerController>(FreelancerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
