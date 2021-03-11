import { Test, TestingModule } from '@nestjs/testing';
import { CompanyNameService } from './company-name.service';

describe('CompanyNameService', () => {
  let service: CompanyNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyNameService],
    }).compile();

    service = module.get<CompanyNameService>(CompanyNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
