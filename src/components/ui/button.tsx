import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = 'secondary', ...props }: ButtonProps) {
  return <button className={cn('ui-button', `ui-button--${variant}`, className)} {...props} />;
}