import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getNextDelivery: jest.fn(), // Mock the AppService method
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getNextDelivery', () => {
    it('should return the next delivery details', async () => {
      // Mock the AppService response
      const mockResponse = {
        title: 'Your next delivery for Fluffy',
        message: "Hey John! In two days' time, we'll be charging you for your next order for Fluffy's fresh food.",
        totalPrice: 55.5,
        freeGift: false,
      };
      jest.spyOn(appService, 'getNextDelivery').mockReturnValue(mockResponse);

      // Call the controller method
      const result = appController.getNextDelivery('1');

      // Assert the result
      expect(result).toEqual(mockResponse);
      expect(appService.getNextDelivery).toHaveBeenCalledWith('1');
    });
  });
});