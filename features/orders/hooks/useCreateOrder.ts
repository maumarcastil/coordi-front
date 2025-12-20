"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/lib/queryKeys";

import { createOrder } from "@/shared/services/orders.service";
import type { CreateOrderRequest } from "@/shared/types/order.types";

export function useCreateOrder() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateOrderRequest) => createOrder(data),
		onSuccess: () => {
			// Invalidar queries de órdenes para refrescar la lista
			queryClient.invalidateQueries({ queryKey: queryKeys.orders.user });
			// También invalidar quotes ya que el estado puede cambiar a "converted"
			queryClient.invalidateQueries({ queryKey: queryKeys.quotes.user });
		},
	});
}
