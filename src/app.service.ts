import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { User, PriceMap } from './models/interfaces';

const prices: PriceMap = {
  A: 55.50,
  B: 59.50,
  C: 62.75,
  D: 66.00,
  E: 69.00,
  F: 71.25,
};

@Injectable()
export class AppService {
  private usersData: User[] = [];

  constructor() {
    const rawData = fs.readFileSync('data.json', 'utf-8');
    this.usersData = JSON.parse(rawData);
  }

  getNextDelivery(userId: string): any {
    // Find the user by ID
    const user = this.usersData.find((u) => u.id === userId);

    // Throw a 404 error if the user is not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Extract cat names and calculate the total price
    const catNames = user.cats
      .filter((cat) => cat.subscriptionActive) // Only include active subscriptions
      .map((cat) => cat.name);

    const totalPrice = user.cats.reduce((sum, cat) => {
      if (cat.subscriptionActive) {
        const price = prices[cat.pouchSize];
        return sum + (price || 0); // Default to 0 if pouch size is invalid
      }
      return sum;
    }, 0);

    // Determine if a free gift is applicable
    const freeGift = totalPrice > 120;

    // Format the response
    const title = `Your next delivery for ${catNames.length > 1 ? catNames.slice(0, -1).join(', ') + ' and ' + catNames[catNames.length - 1] : catNames[0]}`; //copilot explain

    const message = `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames.join(', ').replace(/, ([^,]*)$/, ' and $1')}'s fresh food.`;

    return {
      title,
      message,
      totalPrice: parseFloat(totalPrice.toFixed(2)), // Ensure price is formatted to 2 decimal places
      freeGift,
    };
  }
}
