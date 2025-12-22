import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";

import { registerUser } from "@/shared/services/auth.service";

import RegisterForm from "../RegisterForm";

// Mock next-auth
jest.mock("next-auth/react", () => ({
	signIn: jest.fn(),
}));

// Mock next/navigation
const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
		refresh: mockRefresh,
	}),
}));

// Mock auth service
jest.mock("@/shared/services/auth.service", () => ({
	registerUser: jest.fn(),
}));

describe("RegisterForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render all form fields", () => {
		render(<RegisterForm />);

		expect(
			screen.getByRole("textbox", { name: /nombre completo/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
		).toBeInTheDocument();
		expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /registrarse/i }),
		).toBeInTheDocument();
	});

	it("should show error when passwords do not match", async () => {
		const user = userEvent.setup();
		render(<RegisterForm />);

		await user.type(
			screen.getByRole("textbox", { name: /nombre completo/i }),
			"Test User",
		);
		await user.type(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
			"test@example.com",
		);
		await user.type(screen.getByLabelText(/^contraseña$/i), "password123");
		await user.type(
			screen.getByLabelText(/confirmar contraseña/i),
			"different123",
		);
		await user.click(screen.getByRole("button", { name: /registrarse/i }));

		await waitFor(() => {
			expect(
				screen.getByText(/las contraseñas no coinciden/i),
			).toBeInTheDocument();
		});
	});

	it("should call registerUser and signIn on successful registration", async () => {
		const user = userEvent.setup();
		(registerUser as jest.Mock).mockResolvedValue({ user: { id: "1" } });
		(signIn as jest.Mock).mockResolvedValue({ error: null });

		render(<RegisterForm />);

		await user.type(
			screen.getByRole("textbox", { name: /nombre completo/i }),
			"Test User",
		);
		await user.type(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
			"test@example.com",
		);
		await user.type(screen.getByLabelText(/^contraseña$/i), "password123");
		await user.type(
			screen.getByLabelText(/confirmar contraseña/i),
			"password123",
		);
		await user.click(screen.getByRole("button", { name: /registrarse/i }));

		await waitFor(() => {
			expect(registerUser).toHaveBeenCalledWith({
				name: "Test User",
				email: "test@example.com",
				password: "password123",
			});
		});

		await waitFor(() => {
			expect(signIn).toHaveBeenCalledWith("credentials", {
				email: "test@example.com",
				password: "password123",
				redirect: false,
			});
		});
	});

	it("should show error when registerUser fails", async () => {
		const user = userEvent.setup();
		(registerUser as jest.Mock).mockRejectedValue(
			new Error("Email already exists"),
		);

		render(<RegisterForm />);

		await user.type(
			screen.getByRole("textbox", { name: /nombre completo/i }),
			"Test User",
		);
		await user.type(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
			"test@example.com",
		);
		await user.type(screen.getByLabelText(/^contraseña$/i), "password123");
		await user.type(
			screen.getByLabelText(/confirmar contraseña/i),
			"password123",
		);
		await user.click(screen.getByRole("button", { name: /registrarse/i }));

		await waitFor(() => {
			expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
		});
	});

	it("should redirect to dashboard on successful registration", async () => {
		const user = userEvent.setup();
		(registerUser as jest.Mock).mockResolvedValue({ user: { id: "1" } });
		(signIn as jest.Mock).mockResolvedValue({ error: null });

		render(<RegisterForm />);

		await user.type(
			screen.getByRole("textbox", { name: /nombre completo/i }),
			"Test User",
		);
		await user.type(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
			"test@example.com",
		);
		await user.type(screen.getByLabelText(/^contraseña$/i), "password123");
		await user.type(
			screen.getByLabelText(/confirmar contraseña/i),
			"password123",
		);
		await user.click(screen.getByRole("button", { name: /registrarse/i }));

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/dashboard");
			expect(mockRefresh).toHaveBeenCalled();
		});
	});
});

