import { Test, TestingModule } from '@nestjs/testing';
import { CategryController } from './category.controller';
import { CategryService } from './categry.service';

describe('CategryController', () => {
  let controller: CategryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategryController],
      providers: [CategryService],
    }).compile();

    controller = module.get<CategryController>(CategryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
