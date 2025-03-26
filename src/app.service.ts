import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { User, PriceMap } from './interfaces/interfaces';

const prices: PriceMap = {
  A: 55.5,
  B: 59.5,
  C: 62.75,
  D: 66.0,
  E: 69.0,
  F: 71.25,
};

@Injectable()
export class AppService implements OnModuleInit {
  private usersData: User[] = [];

  async onModuleInit() {
    try {
      const rawData = await fs.readFile('data.json', 'utf-8');
      this.usersData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading data.json:', error);
      throw new Error('Failed to load user data');
    }
  }

  private findUserById(userId: string): User {
    const user = this.usersData.find((u) => u.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private getActiveCatNames(user: User): string[] {
    return user.cats
      .filter((cat) => cat.subscriptionActive)
      .map((cat) => cat.name);
  }

  private calculateTotalPrice(user: User): number {
    return user.cats.reduce((sum, cat) => {
      if (cat.subscriptionActive) {
        const price = prices[cat.pouchSize];
        return sum + (price || 0); // Default to 0 if pouch size is invalid
      }
      return sum;
    }, 0);
  }

  private isFreeGiftApplicable(totalPrice: number): boolean {
    return totalPrice > 120;
  }

  private formatTitle(catNames: string[]): string {
    if (catNames.length > 1) {
      return `Your next delivery for ${catNames.slice(0, -1).join(', ')} and ${catNames[catNames.length - 1]}`;
    }
    return `Your next delivery for ${catNames[0]}`;
  }

  private formatMessage(user: User, catNames: string[]): string {
    return `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames.join(', ').replace(/, ([^,]*)$/, ' and $1')}'s fresh food.`;
  }

  getNextDelivery(userId: string): any {
    const user = this.findUserById(userId);
    const catNames = this.getActiveCatNames(user);
    const totalPrice = this.calculateTotalPrice(user);
    const freeGift = this.isFreeGiftApplicable(totalPrice);
    const title = this.formatTitle(catNames);
    const message = this.formatMessage(user, catNames);

    return {
      title,
      message,
      totalPrice: parseFloat(totalPrice.toFixed(2)), 
      freeGift,
    };
  }
}
