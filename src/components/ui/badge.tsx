import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return <span className={cn('ui-badge', `ui-badge--${tone}`, className)} {...props} />;
}