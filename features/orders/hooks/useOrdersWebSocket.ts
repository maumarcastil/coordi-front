"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/lib/queryKeys";

import { useWebSocket } from "@/shared/hooks/useWebSocket";

interface OrderStatusChangedPayload {
	orderId: string;
	previousStatus: string;
	currentStatus: string;
	updatedAt: string;
	statusHistory: {
		id: string;
		status: string;
		notes: string | null;
		location: string | null;
		createdAt: string;
	};
}

interface WebSocketMessage {
	event: string;
	data: OrderStatusChangedPayload;
}

export function useOrdersWebSocket(orderId?: string) {
	const queryClient = useQueryClient();

	const handleMessage = useCallback(
		(data: unknown) => {
			const message = data as WebSocketMessage;

			if (message.event === "order_status_changed") {
				// Siempre invalidar la lista de órdenes del usuario
				queryClient.invalidateQueries({
					queryKey: queryKeys.orders.user,
				});

				// Si estamos en el detalle de una orden específica y coincide, invalidar también
				if (orderId && message.data.orderId === orderId) {
					queryClient.invalidateQueries({
						queryKey: queryKeys.orders.detail(orderId),
					});
					queryClient.invalidateQueries({
						queryKey: queryKeys.orders.history(orderId),
					});
				}
			}
		},
		[queryClient, orderId],
	);

	const { isConnected, send } = useWebSocket({
		path: "/ws/orders",
		onMessage: handleMessage,
	});

	return { isConnected, send };
}
