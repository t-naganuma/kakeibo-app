import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Transaction = {
	id: string;
	category: string;
	amount: number;
	isIncome: boolean;
	timestamp: string;
};

type RecentTransactionsCardProps = {
	transactions: Transaction[];
};

export const RecentTransactionsCard = ({
	transactions,
}: RecentTransactionsCardProps) => {
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('ja-JP', {
			style: 'currency',
			currency: 'JPY',
		}).format(value);
	};

	return (
		<Card className="md:col-span-2">
			<CardHeader>
				<CardTitle>最近の収支</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{transactions.map((transaction) => (
						<div
							key={transaction.id}
							className="flex items-center justify-between"
						>
							<div className="flex items-center space-x-4">
								<div
									className={`w-2 h-2 rounded-full ${
										transaction.isIncome ? 'bg-secondary' : 'bg-destructive'
									}`}
								/>
								<div className="flex-1">
									<p className="text-sm font-medium">{transaction.category}</p>
									<p className="text-xs text-muted-foreground">
										{transaction.timestamp}
									</p>
								</div>
							</div>
							<span
								className={`text-sm font-medium ${
									transaction.isIncome ? 'text-secondary' : 'text-destructive'
								}`}
							>
								{transaction.isIncome ? '+' : '-'}
								{formatCurrency(transaction.amount)}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
