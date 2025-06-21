import { TransactionsCard } from '@/components/model/transactions/TransactionsCard';
import { FloatingActionButton } from '@/components/ui/Buttons';

export const Transactions = () => {
	return (
		<main className="px-6">
			<TransactionsCard />
			<FloatingActionButton href="/transactions" />
		</main>
	);
};
