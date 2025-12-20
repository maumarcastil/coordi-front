import apiClient from "@/shared/lib/axios";
import type {
	QuoteRequest,
	QuoteResponse,
	QuotesResponse,
} from "@/shared/types/quote.types";

export async function createQuote(data: QuoteRequest): Promise<QuoteResponse> {
	const response = await apiClient.post<QuoteResponse>("/quotes", data);
	return response.data;
}

export async function getUserQuotes(): Promise<QuotesResponse> {
	const response = await apiClient.get<QuotesResponse>("/quotes");
	return response.data;
}

