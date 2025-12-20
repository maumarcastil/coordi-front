import apiClient from "@/shared/lib/axios";
import type {
	CreateOrderRequest,
	OrderDetailResponse,
	OrderHistoryResponse,
	OrdersResponse,
} from "@/shared/types/order.types";

export async function createOrder(
	data: CreateOrderRequest,
): Promise<OrderDetailResponse> {
	const response = await apiClient.post<OrderDetailResponse>("/orders", data);
	return response.data;
}

export async function getUserOrders(): Promise<OrdersResponse> {
	const response = await apiClient.get<OrdersResponse>("/orders");
	return response.data;
}

export async function getOrderById(id: string): Promise<OrderDetailResponse> {
	const response = await apiClient.get<OrderDetailResponse>(`/orders/${id}`);
	return response.data;
}

export async function getOrderHistory(id: string): Promise<OrderHistoryResponse> {
	const response = await apiClient.get<OrderHistoryResponse>(`/orders/${id}/history`);
	return response.data;
}

