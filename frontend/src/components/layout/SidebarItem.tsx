import { ReactNode } from 'react';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  children: ReactNode;
  to: string;
  active?: boolean;
}

export default function SidebarItem({
  children,
  to,
  active = false,
}: SidebarItemProps) {
  return (
    <Link
      to={to}
      className="no-underline text-white rounded-md p-3 transition-all bg-red-700"
    >
      <span className="flex items-center justify-center gap-2 font-semibold">
        {children} {active ? <ChevronRight className="w-4 h-4" /> : null}
      </span>
    </Link>
  );
}
