import { ExpenseCard } from './ExpenseCard';
import { IncomeCard } from './IncomeCard';
import { RecentTransactionsCard } from './RecentTransactionsCard';

// サンプルデータ
const sampleRecentTransactions = [
	{
		id: '1',
		category: '給与',
		amount: 250000,
		isIncome: true,
		timestamp: '2時間前',
	},
	{
		id: '2',
		category: '食費（スーパー）',
		amount: 3280,
		isIncome: false,
		timestamp: '5時間前',
	},
	{
		id: '3',
		category: '交通費（電車）',
		amount: 420,
		isIncome: false,
		timestamp: '1日前',
	},
	{
		id: '4',
		category: '副業収入',
		amount: 15000,
		isIncome: true,
		timestamp: '2日前',
	},
	{
		id: '5',
		category: '光熱費',
		amount: 8500,
		isIncome: false,
		timestamp: '3日前',
	},
];

export const TransactionsCard = () => {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<IncomeCard amount={324500} previousMonthChange={5} />
			<ExpenseCard amount={198750} previousMonthChange={-3} />
			<RecentTransactionsCard transactions={sampleRecentTransactions} />
		</div>
	);
};
