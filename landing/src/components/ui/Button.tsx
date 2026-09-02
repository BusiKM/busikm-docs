import Link from 'next/link';

/** Przyciski wg projektu: 56 px na desktopie, 52 px na telefonie, promień 12 px. */

type Variant = 'primary' | 'secondary' | 'secondaryDark';
type Size = 'md' | 'nav' | 'duzy';

const base =
  'inline-flex items-center justify-center rounded-btn font-semibold transition-colors';

const variants: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-dark hover:text-white',
  secondary:
    'border border-line bg-white text-ink hover:border-muted hover:text-ink',
  secondaryDark:
    'border border-line-dark-2 text-paper hover:border-ink-muted hover:text-paper',
};

const sizes: Record<Size, string> = {
  md: 'h-[52px] px-7 text-body lg:h-14',
  nav: 'h-10 px-[18px] text-[15px] font-medium',
  duzy: 'h-[58px] px-9 text-[17px] lg:h-16 lg:px-9 lg:text-[19px]',
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
}: ButtonProps) {
  const cn = `${base} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={cn}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn}>
      {children}
    </Link>
  );
}
