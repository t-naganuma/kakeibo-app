import { Header } from '@/components/ui/Header/header';
import { PageWithHeader } from '@/components/ui/Layout';
import { Top } from './Top';

export const TopPage = () => {
	return (
		<PageWithHeader header={<Header />}>
			<Top />
		</PageWithHeader>
	);
};
