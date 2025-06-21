import { Header } from '@/components/ui/Header/header';
import { PageWithHeader } from '@/components/ui/Layout';
import { Transactions } from './Transactions';

export const TransactionsPage = () => {
	return (
		<PageWithHeader header={<Header />}>
			<Transactions />
		</PageWithHeader>
	);
};
