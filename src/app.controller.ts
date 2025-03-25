import { Controller, Get, Param,  NotFoundException} from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
// import path from 'path';

const dataPath:string = '/Users/victor/Documents/projects/Katkin/tech-test-2024/data.json'; // todo make this more dynamic
// const dataPath = path.join(__dirname, 'data.json'); // Dynamically resolve the path

// things to add - makefile for starting backend and frontend
// things to add - error handling (user puts fake id, user not found, etc)
// things to add - testing
// things to add - security stuff?
interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: string;
}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

interface PriceMap {
  [key: string]: number; // General dictionary type
}

const prices: PriceMap = {
  A: 55.50,
  B: 59.50,
  C: 62.75,
  D: 66.00,
  E: 69.00,
  F: 71.25
};

// TODO - this needs to be read once at the start of the application - think production
// Load the data.json file
let usersData: User[] = [];
const rawData = fs.readFileSync('data.json', 'utf-8');
usersData = JSON.parse(rawData);
// fs.readFile(dataPath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading data.json:', err);
//     process.exit(1);
//   }
//   usersData = JSON.parse(data);
// });

// {
//   "title": "Your next delivery for <cat names, separated by comma or 'and'>",
//   "message": "Hey <firstName>! In two days' time, we'll be charging you for your next order for <cat names, formatted as described below>'s fresh food.",
//   "totalPrice": <total price, calculated via the formula shown in a later section in this README>,
//   "freeGift": <true if the total price exceeds 120 pounds, otherwise false>
// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:id')
  getUserById(@Param('id') userId: string): User {
    // Find the user by ID
    const user = usersData.find((u) => u.id === userId);

    // Throw a 404 error if the user is not found
    if (!user) {
      throw new NotFoundException('User not found'); // create a custom error message and view for this maybe if theres time
    }

    return user;
  }

  @Get('/users/:id/next-delivery')
  getNextDelivery(@Param('id') userId: string): any {
    // Find the user by ID
    const user = usersData.find((u) => u.id === userId);

    // Throw a 404 error if the user is not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Extract cat names and calculate the total price
    const catNames = user.cats.map((cat) => cat.name);
    const totalPrice = user.cats.reduce((sum, cat) => {
      const price = prices[cat.pouchSize];
      return sum + (price || 0); // Default to 0 if pouch size is invalid
    }, 0);

    // Determine if a free gift is applicable
    const freeGift = totalPrice > 120;

    // Format the response
    const title = `Your next delivery for ${catNames.join(', ').replace(/, ([^,]*)$/, ' and $1')}`;
    const message = `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames.join(', ').replace(/, ([^,]*)$/, ' and $1')}'s fresh food.`;

    return {
      title,
      message,
      totalPrice: parseFloat(totalPrice.toFixed(2)), // Ensure price is formatted to 2 decimal places
      freeGift,
    };
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
