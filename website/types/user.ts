export interface CombinedUsageResponse {
  dailyUsage: DailyUsage[]
  monthlyUsage: MonthlyUsage[]
}

export interface DailyUsage {
  date: string
  data_volume: number
}

export interface MonthlyUsage {
  month: string
  data_volume: number
}

export interface MonthlyUsageResponse {
  usage: MonthlyUsage[]
}

export interface SubscriptionPeriodUsage {
  period_start: number
  period_end: number
  data_volume: number
}

export interface UserData {
  userID: string
  email: string
  stripeCustomerId: string
  trialEnd: number
  apiKey: string
  dailyUsage: DailyUsage[]
  monthlyUsage: MonthlyUsage[]
  subscriptionPeriodUsage: SubscriptionPeriodUsage
  subscription: Subscription
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid'
}

export interface Subscription {
  id: number
  name: string
  monthly_limit: number
  monthly_price: number
  yearly_price: number
  interval: 'monthly' | 'yearly'
}