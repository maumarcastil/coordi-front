import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";

import LoginForm from "../LoginForm";

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

describe("LoginForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render email and password fields", () => {
		render(<LoginForm />);

		expect(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
		).toBeInTheDocument();
		expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /ingresar/i }),
		).toBeInTheDocument();
	});

	it("should show validation errors when submitting empty form", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);

		await user.click(screen.getByRole("button", { name: /ingresar/i }));

		await waitFor(() => {
			expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
		});
	});

	it("should call signIn with correct credentials", async () => {
		const user = userEvent.setup();
		(signIn as jest.Mock).mockResolvedValue({ error: null });

		render(<LoginForm />);

		await user.type(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
			"test@example.com",
		);
		await user.type(screen.getByLabelText(/contraseña/i), "password123");
		await user.click(screen.getByRole("button", { name: /ingresar/i }));

		await waitFor(() => {
			expect(signIn).toHaveBeenCalledWith("credentials", {
				email: "test@example.com",
				password: "password123",
				redirect: false,
			});
		});
	});

	it("should show error message when signIn fails", async () => {
		const user = userEvent.setup();
		(signIn as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });

		render(<LoginForm />);

		await user.type(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
			"test@example.com",
		);
		await user.type(screen.getByLabelText(/contraseña/i), "wrongpassword");
		await user.click(screen.getByRole("button", { name: /ingresar/i }));

		await waitFor(() => {
			expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
		});
	});

	it("should redirect to dashboard on successful login", async () => {
		const user = userEvent.setup();
		(signIn as jest.Mock).mockResolvedValue({ error: null });

		render(<LoginForm />);

		await user.type(
			screen.getByRole("textbox", { name: /correo electrónico/i }),
			"test@example.com",
		);
		await user.type(screen.getByLabelText(/contraseña/i), "password123");
		await user.click(screen.getByRole("button", { name: /ingresar/i }));

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/dashboard");
			expect(mockRefresh).toHaveBeenCalled();
		});
	});
});

