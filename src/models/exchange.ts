interface Currency {
  count: number;
  type: string;
  unitPrice: string;
  percentage: number;
}

export interface Exchange {
  base: string;
  quote: string;
  volume: number;
  price: number;
  price_usd: number;
  currency: Currency[];
}
