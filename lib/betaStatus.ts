import { BetaStatus } from './partners';

export function statusLabel(status?: BetaStatus | string) {
  if (status === 'approved') return 'Approved';
  if (status === 'rejected') return 'Rejected';
  if (status === 'needs_more_info') return 'Needs More Info';
  if (status === 'awaiting_parent_review') return 'Awaiting Parent Review';
  return 'Pending Review';
}

export function statusEmoji(status?: BetaStatus | string) {
  if (status === 'approved') return '🟢';
  if (status === 'rejected') return '🔴';
  if (status === 'needs_more_info') return '🟡';
  if (status === 'awaiting_parent_review') return '🟠';
  return '🟡';
}
