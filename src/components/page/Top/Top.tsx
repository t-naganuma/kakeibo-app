import { TransactionsCard } from '@/components/model/transactions/TransactionsCard';
import { FloatingActionButton } from '@/components/ui/Buttons';

export const Top = () => {
	return (
		<main className="px-6">
			<TransactionsCard />
			<FloatingActionButton href="" />
		</main>
	);
};
