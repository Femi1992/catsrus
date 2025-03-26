import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { NotFoundException } from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);

    // Mock the usersData for testing
    appService['usersData'] = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe', // Added lastName
            email: 'john.doe@example.com', // Added email
            cats: [
            { name: 'Fluffy', subscriptionActive: true, breed: "Himalayan", pouchSize: 'A' },
            { name: 'Mittens', subscriptionActive: false, breed: "Himalayan", pouchSize: 'B' },
            ],
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith', // Added lastName
            email: 'jane.smith@example.com', // Added email
            cats: [
            { name: 'Whiskers', subscriptionActive: true, breed: "Himalayan", pouchSize: 'C' },
            ],
        },
        ];
  });

  describe('findUserById', () => {
    it('should return the user if found', () => {
      const user = appService['findUserById']('1');
      expect(user).toEqual({
        id: '1',
        firstName: 'John',
        lastName: 'Doe', // Added lastName
        email: 'john.doe@example.com', // Added email
        cats: [
          { name: 'Fluffy', subscriptionActive: true, breed: "Himalayan", pouchSize: 'A' },
          { name: 'Mittens', subscriptionActive: false, breed: "Himalayan", pouchSize: 'B' },
        ],
      });
    });
  
    it('should throw NotFoundException if user is not found', () => {
      expect(() => appService['findUserById']('999')).toThrow(NotFoundException);
    });
  });

  describe('getActiveCatNames', () => {
    it('should return names of cats with active subscriptions', () => {
      const user = appService['findUserById']('1');
      const activeCatNames = appService['getActiveCatNames'](user);
      expect(activeCatNames).toEqual(['Fluffy']);
    });
  });

  describe('calculateTotalPrice', () => {
    it('should calculate the total price for active subscriptions', () => {
      const user = appService['findUserById']('1');
      const totalPrice = appService['calculateTotalPrice'](user);
      expect(totalPrice).toBe(55.5);
    });
  });

  describe('isFreeGiftApplicable', () => {
    it('should return true if total price exceeds 120', () => {
      const result = appService['isFreeGiftApplicable'](121);
      expect(result).toBe(true);
    });

    it('should return false if total price is 120 or less', () => {
      const result = appService['isFreeGiftApplicable'](120);
      expect(result).toBe(false);
    });
  });

  describe('formatTitle', () => {
    it('should format the title for multiple cats', () => {
      const title = appService['formatTitle'](['Fluffy', 'Mittens']);
      expect(title).toBe('Your next delivery for Fluffy and Mittens');
    });

    it('should format the title for a single cat', () => {
      const title = appService['formatTitle'](['Fluffy']);
      expect(title).toBe('Your next delivery for Fluffy');
    });
  });

  describe('formatMessage', () => {
    it('should format the message for the user and their cats', () => {
      const user = appService['findUserById']('1');
      const message = appService['formatMessage'](user, ['Fluffy']);
      expect(message).toBe(
        "Hey John! In two days' time, we'll be charging you for your next order for Fluffy's fresh food."
      );
    });
  });

  describe('getNextDelivery', () => {
    it('should return the correct delivery details', () => {
      const result = appService.getNextDelivery('1');
      expect(result).toEqual({
        title: 'Your next delivery for Fluffy',
        message: "Hey John! In two days' time, we'll be charging you for your next order for Fluffy's fresh food.",
        totalPrice: 55.5,
        freeGift: false,
      });
    });
  });
});