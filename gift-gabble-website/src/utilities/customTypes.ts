export type AmazonProductObj = {
  title: string;
  asin: string;
  linkUrl: string;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  price?: number;
  currencySymbol?: string;
  isPrime: boolean;
};

export type FormResponse = {
  why: string;
  who: string;
  whoOne: string;
  whoTwo: string;
  desc: string;
  budget: number;
  whyExtra: string;
  giftNotes: string;
};

export type APIFormResponse = {
  who: string;
  why: string;
  whyExtra?: string;
  desc: string;
  budget: number;
  giftNotes?: string;
};
