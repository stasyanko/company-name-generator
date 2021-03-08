import { Test, TestingModule } from '@nestjs/testing';
import { CompanyNameController } from './company-name.controller';

describe('CompanyNameController', () => {
  let controller: CompanyNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyNameController],
    }).compile();

    controller = module.get<CompanyNameController>(CompanyNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
