import { Test, TestingModule } from '@nestjs/testing';
import { CategryService } from './categry.service';
import { Category } from './entities/categry.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategryService', () => {
  let service: CategryService;
  let mockCategoryRepository;

  beforeEach(async () => {
    mockCategoryRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategryService>(CategryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const categoryDto = { name: 'Category 1', description: 'Description 1' };

    mockCategoryRepository.create.mockReturnValue(categoryDto);
    mockCategoryRepository.save.mockResolvedValue(categoryDto);

    const result = await service.create(categoryDto);

    expect(result).toEqual(categoryDto);
    expect(mockCategoryRepository.create).toHaveBeenCalledWith(categoryDto);
    expect(mockCategoryRepository.save).toHaveBeenCalledWith(categoryDto);
  });

  it('should return all categories', async () => {
    const categories = [
      { id: 1, name: 'Category 1', description: 'Description 1' },
    ];

    mockCategoryRepository.find.mockResolvedValue(categories);

    const result = await service.findAll();

    expect(result).toEqual(categories);
    expect(mockCategoryRepository.find).toHaveBeenCalled();
  });

  it('should return one category by id', async () => {
    const category = {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    };

    mockCategoryRepository.findOne.mockResolvedValue(category);

    const result = await service.findOne(1);

    expect(result).toEqual(category);
    expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a category', async () => {
    const updateDto = {
      name: 'Updated Category',
      description: 'Updated Description',
    };
    const category = {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    };

    mockCategoryRepository.update.mockResolvedValue({ affected: 1 });
    mockCategoryRepository.findOne.mockResolvedValue({
      ...category,
      ...updateDto,
    });

    const result = await service.update(1, updateDto);

    expect(result).toEqual({ ...category, ...updateDto });
    expect(mockCategoryRepository.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove a category', async () => {
    const category = {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    };

    mockCategoryRepository.findOne.mockResolvedValue(category);
    mockCategoryRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(result).toBeUndefined();
    expect(mockCategoryRepository.delete).toHaveBeenCalledWith(1);
  });
});
