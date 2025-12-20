"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserOrders } from "@/shared/services/orders.service";
import { queryKeys } from "@/shared/lib/queryKeys";

export function useUserOrders() {
	return useQuery({
		queryKey: queryKeys.orders.user,
		queryFn: getUserOrders,
	});
}
