import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { User, PriceMap } from './interfaces/interfaces';

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
  // is this approach scalable? what are the potential issues?
  /**
   * This approach is not scalable because the data is read from a file synchronously, which can cause performance issues if the file is large or if there are many concurrent requests. 
   * Reading the data synchronously can block the event loop and reduce the responsiveness of the application. 
   * Additionally, reading the data from a file on every request can be inefficient and slow, especially if the file is large or if the data needs to be processed before being returned to the client. 
   * A more scalable approach would be to load the data into memory when the application starts and cache it for subsequent requests. 
   * This would reduce the I/O operations and improve the performance of the application.
   */
  // Another potential issue is that the data is read from a file on every request, which can be inefficient and slow, especially if the file is large or if the data needs to be processed before being returned to the client. Caching the data in memory or using a database would help to improve the performance and efficiency of the application.
  // Overall, to make this approach more scalable and efficient, the data should be loaded into memory when the application starts, cached for subsequent requests, and stored in a database or distributed cache for improved scalability and reliability.
  getNextDelivery(userId: string): any {
    // Find the user by ID
    const user = this.usersData.find((u) => u.id === userId);

    // Throw a 404 error if the user is not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //seperate the logic into smaller functions
    // Extract cat names and calculate the total price
    const catNames = user.cats
      .filter((cat) => cat.subscriptionActive) // Only include active subscriptions
      .map((cat) => cat.name);

    // seperate logic into smaller functions
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
