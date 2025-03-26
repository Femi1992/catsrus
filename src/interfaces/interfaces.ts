export interface Cat {
    name: string;
    subscriptionActive: boolean;
    breed: string;
    pouchSize: string;
}
  
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    cats: Cat[];
}
  
export interface PriceMap {
    [key: string]: number;
}

export interface DeliveryDetails {
    title: string;
    message: string;
    totalPrice: number;
    freeGift: boolean;
}