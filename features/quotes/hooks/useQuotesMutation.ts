"use client";

import { useMutation } from "@tanstack/react-query";

import { createQuote } from "@/shared/services/quotes.service";
import type { QuoteRequest } from "@/shared/types/quote.types";

export function useCreateQuote() {
	return useMutation({
		mutationFn: (data: QuoteRequest) => createQuote(data),
	});
}
