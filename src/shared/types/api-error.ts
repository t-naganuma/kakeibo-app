// APIエラー型の定義
export type ApiError =
	| { type: 'network'; message: string; status?: number }
	| { type: 'notFound'; message: string }
	| { type: 'unauthorized'; message: string }
	| { type: 'forbidden'; message: string }
	| { type: 'validation'; message: string; field?: string }
	| { type: 'conflict'; message: string }
	| { type: 'internalServer'; message: string }
	| { type: 'unknown'; message: string };

// HTTPステータスコードからエラー型を判定
export const createApiErrorFromStatus = (
	status: number,
	message: string,
): ApiError => {
	switch (status) {
		case 400:
			return { type: 'validation', message };
		case 401:
			return { type: 'unauthorized', message };
		case 403:
			return { type: 'forbidden', message };
		case 404:
			return { type: 'notFound', message };
		case 409:
			return { type: 'conflict', message };
		case 500:
		case 502:
		case 503:
		case 504:
			return { type: 'internalServer', message };
		default:
			return { type: 'network', message, status };
	}
};
