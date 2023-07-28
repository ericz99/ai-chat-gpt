// Function to check if a date is from yesterday
export function isYesterday(date: Date): boolean {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

// Function to check if a date is 30 days ago
export function is30DaysAgo(date: Date): boolean {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  return date.toDateString() === thirtyDaysAgo.toDateString();
}

// Function to check if a date is from a different month
export function isDifferentMonth(date: Date): boolean {
  const today = new Date();
  return date.getMonth() !== today.getMonth();
}
