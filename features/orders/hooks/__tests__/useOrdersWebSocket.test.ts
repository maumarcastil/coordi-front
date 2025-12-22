import { renderHook } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";

import { useOrdersWebSocket } from "../useOrdersWebSocket";
import { queryKeys } from "@/shared/lib/queryKeys";

// Mock useQueryClient
const mockInvalidateQueries = jest.fn();
jest.mock("@tanstack/react-query", () => ({
	useQueryClient: jest.fn(() => ({
		invalidateQueries: mockInvalidateQueries,
	})),
}));

// Capture the onMessage callback
let capturedOnMessage: ((data: unknown) => void) | undefined;

jest.mock("@/shared/hooks/useWebSocket", () => ({
	useWebSocket: (options: { onMessage?: (data: unknown) => void }) => {
		capturedOnMessage = options.onMessage;
		return {
			isConnected: true,
			send: jest.fn(),
		};
	},
}));

describe("useOrdersWebSocket", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		capturedOnMessage = undefined;
	});

	it("should return isConnected and send function", () => {
		const { result } = renderHook(() => useOrdersWebSocket());

		expect(result.current.isConnected).toBe(true);
		expect(typeof result.current.send).toBe("function");
	});

	it("should invalidate orders.user query on order_status_changed event", () => {
		renderHook(() => useOrdersWebSocket());

		const message = {
			event: "order_status_changed",
			data: {
				orderId: "order-123",
				previousStatus: "pending",
				currentStatus: "in_transit",
			},
		};

		capturedOnMessage?.(message);

		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: queryKeys.orders.user,
		});
	});

	it("should invalidate order detail and history when orderId matches", () => {
		const orderId = "order-123";
		renderHook(() => useOrdersWebSocket(orderId));

		const message = {
			event: "order_status_changed",
			data: {
				orderId: "order-123",
				previousStatus: "pending",
				currentStatus: "in_transit",
			},
		};

		capturedOnMessage?.(message);

		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: queryKeys.orders.user,
		});
		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: queryKeys.orders.detail(orderId),
		});
		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: queryKeys.orders.history(orderId),
		});
	});

	it("should not invalidate detail/history when orderId does not match", () => {
		const orderId = "order-456";
		renderHook(() => useOrdersWebSocket(orderId));

		const message = {
			event: "order_status_changed",
			data: {
				orderId: "order-123", // Different order
				previousStatus: "pending",
				currentStatus: "in_transit",
			},
		};

		capturedOnMessage?.(message);

		// Should invalidate user orders
		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: queryKeys.orders.user,
		});

		// Should NOT invalidate detail/history for different order
		expect(mockInvalidateQueries).not.toHaveBeenCalledWith({
			queryKey: queryKeys.orders.detail(orderId),
		});
		expect(mockInvalidateQueries).not.toHaveBeenCalledWith({
			queryKey: queryKeys.orders.history(orderId),
		});
	});

	it("should ignore non order_status_changed events", () => {
		renderHook(() => useOrdersWebSocket());

		const message = {
			event: "some_other_event",
			data: {},
		};

		capturedOnMessage?.(message);

		expect(mockInvalidateQueries).not.toHaveBeenCalled();
	});
});
