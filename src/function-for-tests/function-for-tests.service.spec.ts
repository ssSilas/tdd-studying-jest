import { Test, TestingModule } from '@nestjs/testing';
import { FunctionForTestsService } from './function-for-tests.service';

describe('FunctionForTestsService', () => {
  let service: FunctionForTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunctionForTestsService],
    }).compile();

    service = module.get<FunctionForTestsService>(FunctionForTestsService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('calculator sum', () => {
    it('should return the sum of two positive numbers', () => {
      //execute
      const result = service.sum(5, 2)

      //assert
      expect(result).toBe(7)
    })

    it('should return the sum of two negative numbers', () => {
      //execute
      const result = service.sum(5, -2)

      //assert
      expect(result).toBe(3)
    })
  });

  describe('subtract sum', () => {
    it('should return the sum of two positive numbers', () => {
      //execute
      const result = service.subtract(5, 2)

      //assert
      expect(result).toBe(3)
    })

    it('should return the sum of two negative numbers', () => {
      //execute
      const result = service.subtract(5, -2)

      //assert
      expect(result).toBe(7)
    })
  });
});
