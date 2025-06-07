import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

type FloatingActionButtonProps = {
	href: string;
	label?: string;
	className?: string;
	children?: React.ReactNode;
};

export const FloatingActionButton = ({
	href,
	label = '新規追加',
	className,
	children,
}: FloatingActionButtonProps) => {
	return (
		<Link
			href={href}
			className={cn(
				'fixed bottom-6 right-6 z-50',
				'inline-flex items-center justify-center',
				'h-14 w-14 rounded-full',
				'bg-accent text-accent-foreground',
				'shadow-lg hover:shadow-xl',
				'transition-all duration-200 ease-in-out',
				'hover:scale-105 active:scale-95',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				'group',
				className,
			)}
			aria-label={label}
		>
			{children || (
				<Plus className="h-6 w-6 transition-transform group-hover:rotate-90" />
			)}
			<span className="sr-only">{label}</span>
		</Link>
	);
};
