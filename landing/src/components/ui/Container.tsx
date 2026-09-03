type ContainerProps = {
  children: React.ReactNode;
  /** Domyślnie 1120px — maksymalna szerokość treści z systemu designu. */
  width?: 'default' | 'narrow' | 'cta';
  className?: string;
};

const widths = {
  default: 'max-w-[1120px]',
  narrow: 'max-w-[800px]',
  cta: 'max-w-[900px]',
} as const;

export function Container({
  children,
  width = 'default',
  className = '',
}: ContainerProps) {
  return (
    <div className={`mx-auto ${widths[width]} ${className}`}>{children}</div>
  );
}
