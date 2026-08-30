type Variant = 'primary' | 'secondary' | 'secondaryDark' | 'text';
type Size = 'md' | 'sm' | 'nav';

const base =
  'inline-flex items-center justify-center rounded-btn font-semibold transition-colors';

const variants: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-dark hover:text-white',
  secondary:
    'bg-white border border-line text-ink hover:text-ink hover:border-muted',
  secondaryDark:
    'border border-white/22 text-paper hover:text-paper hover:border-white/40',
  text: 'text-blue',
};

const sizes: Record<Size, string> = {
  md: 'h-[52px] px-7 text-body',
  sm: 'h-11 px-[22px] text-[15px]',
  nav: 'h-9 px-[18px] text-[15px]',
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
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </a>
  );
}
