import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CreateOrderModal } from "../CreateOrderModal";

// Mock useCreateOrder hook
const mockMutateAsync = jest.fn();
const mockReset = jest.fn();
let mockIsPending = false;
let mockIsError = false;

jest.mock("@/features/orders/hooks/useCreateOrder", () => ({
	useCreateOrder: () => ({
		mutateAsync: mockMutateAsync,
		isPending: mockIsPending,
		isError: mockIsError,
		reset: mockReset,
	}),
}));

const mockQuote = {
	id: 1,
	originCityId: 1,
	destinationCityId: 2,
	weight: 5,
	length: 30,
	width: 20,
	height: 15,
	volumetricWeight: 3.6,
	chargeableWeight: 5,
	totalPrice: 25000,
	status: "active",
	expiresAt: "2025-12-31T00:00:00.000Z",
	createdAt: "2025-01-01T00:00:00.000Z",
};

const defaultProps = {
	open: true,
	onClose: jest.fn(),
	quote: mockQuote,
	originCityName: "Bogotá",
	destinationCityName: "Medellín",
};

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("CreateOrderModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockIsPending = false;
		mockIsError = false;
	});

	it("should not render when quote is null", () => {
		render(<CreateOrderModal {...defaultProps} quote={null} />, {
			wrapper: createWrapper(),
		});

		expect(
			screen.queryByText(/crear orden de envío/i),
		).not.toBeInTheDocument();
	});

	it("should render form with all fields when open", () => {
		render(<CreateOrderModal {...defaultProps} />, {
			wrapper: createWrapper(),
		});

		expect(screen.getByText(/crear orden de envío/i)).toBeInTheDocument();
		expect(screen.getByText(/datos del remitente/i)).toBeInTheDocument();
		expect(screen.getByText(/datos del destinatario/i)).toBeInTheDocument();
		expect(
			screen.getAllByRole("textbox", { name: /nombre completo/i }),
		).toHaveLength(2);
		expect(screen.getAllByRole("textbox", { name: /teléfono/i })).toHaveLength(
			2,
		);
		expect(
			screen.getByRole("button", { name: /crear orden/i }),
		).toBeInTheDocument();
	});

	it("should display quote summary", () => {
		render(<CreateOrderModal {...defaultProps} />, {
			wrapper: createWrapper(),
		});

		expect(screen.getByText(/resumen de la cotización/i)).toBeInTheDocument();
		expect(screen.getByText("Bogotá")).toBeInTheDocument();
		expect(screen.getByText("Medellín")).toBeInTheDocument();
		expect(screen.getByText(/5 kg/i)).toBeInTheDocument();
	});

	it("should show error alert when mutation fails", () => {
		mockIsError = true;

		render(<CreateOrderModal {...defaultProps} />, {
			wrapper: createWrapper(),
		});

		expect(screen.getByText(/error al crear la orden/i)).toBeInTheDocument();
	});

	it("should show loading state when pending", () => {
		mockIsPending = true;

		render(<CreateOrderModal {...defaultProps} />, {
			wrapper: createWrapper(),
		});

		expect(screen.getByRole("button", { name: /creando/i })).toBeDisabled();
		expect(screen.getByRole("button", { name: /cancelar/i })).toBeDisabled();
	});

	it("should call onClose when cancel button is clicked", async () => {
		const user = userEvent.setup();
		const onClose = jest.fn();

		render(<CreateOrderModal {...defaultProps} onClose={onClose} />, {
			wrapper: createWrapper(),
		});

		await user.click(screen.getByRole("button", { name: /cancelar/i }));

		expect(onClose).toHaveBeenCalled();
	});

	it("should show success view after order is created", async () => {
		const user = userEvent.setup();
		const mockOrder = {
			id: "order-123",
			totalPrice: 25000,
		};

		mockMutateAsync.mockResolvedValue({ order: mockOrder });

		render(<CreateOrderModal {...defaultProps} />, {
			wrapper: createWrapper(),
		});

		// Fill sender fields
		const nameFields = screen.getAllByRole("textbox", {
			name: /nombre completo/i,
		});
		await user.type(nameFields[0], "Juan Pérez");

		const phoneFields = screen.getAllByRole("textbox", { name: /teléfono/i });
		await user.type(phoneFields[0], "3001234567");

		const addressFields = screen.getAllByRole("textbox", {
			name: /dirección completa/i,
		});
		await user.type(addressFields[0], "Calle 123 #45-67, Barrio Centro");

		// Fill recipient fields
		await user.type(nameFields[1], "María García");
		await user.type(phoneFields[1], "3009876543");
		await user.type(addressFields[1], "Carrera 89 #12-34, Barrio Norte");

		// Submit form
		await user.click(screen.getByRole("button", { name: /crear orden/i }));

		await waitFor(() => {
			expect(
				screen.getByText(/¡orden creada exitosamente!/i),
			).toBeInTheDocument();
		});

		expect(screen.getByText("order-123")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /ver detalle/i })).toHaveAttribute(
			"href",
			"/dashboard/ordenes/order-123",
		);
	});
});

