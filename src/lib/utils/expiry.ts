import { differenceInDays, parseISO } from 'date-fns';

export type ExpiryStatus = 'critical' | 'warning' | 'safe';

export function getExpiryStatus(expiryDate: string): ExpiryStatus {
  const days = differenceInDays(parseISO(expiryDate), new Date());
  
  if (days < 2) return 'critical';
  if (days <= 5) return 'warning';
  return 'safe';
}

export function getExpiryColor(status: ExpiryStatus): string {
  switch (status) {
    case 'critical':
      return 'bg-red-500 hover:bg-red-600';
    case 'warning':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'safe':
      return 'bg-green-500 hover:bg-green-600';
    default:
      return 'bg-gray-500';
  }
}
