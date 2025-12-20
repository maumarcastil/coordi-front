"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserQuotes } from "@/shared/services/quotes.service";
import { queryKeys } from "@/shared/lib/queryKeys";

export function useUserQuotes() {
	return useQuery({
		queryKey: queryKeys.quotes.user,
		queryFn: getUserQuotes,
	});
}

