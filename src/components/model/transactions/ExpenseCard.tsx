import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type ExpenseCardProps = {
	amount: number;
	previousMonthChange: number;
};

export const ExpenseCard = ({
	amount,
	previousMonthChange,
}: ExpenseCardProps) => {
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('ja-JP', {
			style: 'currency',
			currency: 'JPY',
		}).format(value);
	};

	const formatPercentage = (value: number) => {
		const sign = value >= 0 ? '+' : '';
		return `前月比 ${sign}${value}%`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>今月の支出</CardTitle>
				<CardDescription>今月の支出総額</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold text-red-600">
					{formatCurrency(amount)}
				</div>
				<p className="text-sm text-muted-foreground">
					{formatPercentage(previousMonthChange)}
				</p>
			</CardContent>
		</Card>
	);
};
