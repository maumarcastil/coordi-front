import apiClient from "@/shared/lib/axios";
import type {
	CreateOrderRequest,
	OrderResponse,
	OrdersResponse,
} from "@/shared/types/order.types";

export async function createOrder(
	data: CreateOrderRequest,
): Promise<OrderResponse> {
	const response = await apiClient.post<OrderResponse>("/orders", data);
	return response.data;
}

export async function getUserOrders(): Promise<OrdersResponse> {
	const response = await apiClient.get<OrdersResponse>("/orders");
	return response.data;
}

