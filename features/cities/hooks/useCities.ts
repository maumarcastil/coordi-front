"use client";

import { useQuery } from "@tanstack/react-query";

import { getCities } from "@/shared/services/cities.service";
import { queryKeys } from "@/shared/lib/queryKeys";

export function useCities() {
	return useQuery({
		queryKey: queryKeys.cities.all,
		queryFn: getCities,
	});
}
