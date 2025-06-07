export const PageWithHeader = ({ header, children }: WithHeaderProps) => {
	return (
		<div className="grid gap-6">
			{header}
			{children}
		</div>
	);
};

type WithHeaderProps = {
	header: React.ReactElement;
	children: React.ReactNode;
};
