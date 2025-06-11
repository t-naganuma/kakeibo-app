import { Result, err, ok } from 'neverthrow';
import { ApiError, createApiErrorFromStatus } from '../types/api-error';

// HTTPクライアントのインターフェース
export interface HttpClient {
	get<T>(path: string, options?: RequestInit): Promise<Result<T, ApiError>>;
	post<T>(
		path: string,
		data?: unknown,
		options?: RequestInit,
	): Promise<Result<T, ApiError>>;
	put<T>(
		path: string,
		data?: unknown,
		options?: RequestInit,
	): Promise<Result<T, ApiError>>;
	patch<T>(
		path: string,
		data?: unknown,
		options?: RequestInit,
	): Promise<Result<T, ApiError>>;
	delete<T>(path: string, options?: RequestInit): Promise<Result<T, ApiError>>;
}

// HTTP Clientの設定
export interface HttpClientConfig {
	baseUrl: string;
	defaultHeaders?: Record<string, string>;
	timeout?: number;
}

// Fetch APIを使用したHTTP Clientの実装
export function createHttpClient(config: HttpClientConfig): HttpClient {
	const { baseUrl, defaultHeaders = {}, timeout = 10000 } = config;

	const makeRequest = async <T>(
		path: string,
		options: RequestInit = {},
	): Promise<Result<T, ApiError>> => {
		const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);

		try {
			// タイムアウト設定

			const response = await fetch(url, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					...defaultHeaders,
					...options.headers,
				},
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			// レスポンスのエラーチェック
			if (!response.ok) {
				const errorMessage = await response.text().catch(() => 'Unknown error');
				return err(createApiErrorFromStatus(response.status, errorMessage));
			}

			// 空のレスポンスの場合
			if (response.status === 204) {
				return ok({} as T);
			}

			// JSONレスポンスをパース
			const data = await response.json();
			return ok(data);
		} catch (error) {
			if (error instanceof Error) {
				if (error.name === 'AbortError') {
					return err({ type: 'network', message: 'Request timeout' });
				}
				return err({ type: 'network', message: error.message });
			}
			return err({ type: 'unknown', message: 'Unknown error occurred' });
		}
	};

	return {
		get: <T>(path: string, options?: RequestInit) =>
			makeRequest<T>(path, { ...options, method: 'GET' }),

		post: <T>(path: string, data?: unknown, options?: RequestInit) =>
			makeRequest<T>(path, {
				...options,
				method: 'POST',
				body: data ? JSON.stringify(data) : undefined,
			}),

		put: <T>(path: string, data?: unknown, options?: RequestInit) =>
			makeRequest<T>(path, {
				...options,
				method: 'PUT',
				body: data ? JSON.stringify(data) : undefined,
			}),

		patch: <T>(path: string, data?: unknown, options?: RequestInit) =>
			makeRequest<T>(path, {
				...options,
				method: 'PATCH',
				body: data ? JSON.stringify(data) : undefined,
			}),

		delete: <T>(path: string, options?: RequestInit) =>
			makeRequest<T>(path, { ...options, method: 'DELETE' }),
	};
}
