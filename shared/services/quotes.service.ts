import apiClient from "@/shared/lib/axios";
import type { QuoteRequest, QuoteResponse } from "@/shared/types/quote.types";

export async function createQuote(data: QuoteRequest): Promise<QuoteResponse> {
	const response = await apiClient.post<QuoteResponse>("/quotes", data);
	return response.data;
}

