"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrderById, getOrderHistory } from "@/shared/services/orders.service";
import { queryKeys } from "@/shared/lib/queryKeys";

export function useOrderDetail(orderId: string) {
	return useQuery({
		queryKey: queryKeys.orders.detail(orderId),
		queryFn: () => getOrderById(orderId),
		enabled: !!orderId,
	});
}

export function useOrderHistory(orderId: string) {
	return useQuery({
		queryKey: queryKeys.orders.history(orderId),
		queryFn: () => getOrderHistory(orderId),
		enabled: !!orderId,
	});
}

