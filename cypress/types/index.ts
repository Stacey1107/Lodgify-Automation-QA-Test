export type TRentalPricing = Readonly<{
  readonly Monthly?: Record<string, TCurrencyPrices>;
  readonly Yearly?: Record<string, TCurrencyPrices>;
  readonly TwoYears?: Record<string, TCurrencyPrices>;
}>;

export type TCurrencyPrices = Readonly<{
  readonly USD?: string[];
  readonly EUR?: string[];
  readonly GBP?: string[];
}>;

export type TCurrencyOption = Readonly<'eur' | 'usd' | 'gbp'>;

export type TCurrencyLabel = Readonly<'€ EUR' | '£ GBP' | '$ USD'>;
