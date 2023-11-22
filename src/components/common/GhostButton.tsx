import { Button } from 'antd';

export default function GhostButton({
  className,
  title,
  icon,
  href,
  children,
}: {
  title?: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Button
        className={className}
        type="text"
        title={title}
        icon={icon}
        href={href}
        target="_blank"
      >
        {children}
      </Button>
    </>
  );
}
