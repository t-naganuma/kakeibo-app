import { Button } from '@/components/ui/button';
import { createExpense } from '@/lib/actions/transactions-action';
import Form from 'next/form';

export const TransactionCreateForm = () => {
	return (
		<Form action={createExpense}>
			<Button type="submit">登録</Button>
		</Form>
	);
};
