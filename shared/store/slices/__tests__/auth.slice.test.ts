import type { Session } from "next-auth";

import authReducer, { setSession, clearSession } from "../auth.slice";

const mockSession: Session = {
	user: { name: "Test User", email: "test@test.com" },
	expires: "2025-12-31T23:59:59.999Z",
	accessToken: "mock-token",
};

describe("authSlice", () => {
	describe("initial state", () => {
		it("should have null session and isAuthenticated false", () => {
			const state = authReducer(undefined, { type: "unknown" });

			expect(state.session).toBeNull();
			expect(state.isAuthenticated).toBe(false);
		});
	});

	describe("setSession", () => {
		it("should set isAuthenticated true when session is provided", () => {
			const state = authReducer(undefined, setSession(mockSession));

			expect(state.session).toEqual(mockSession);
			expect(state.isAuthenticated).toBe(true);
		});

		it("should set isAuthenticated false when session is null", () => {
			const authenticatedState = authReducer(
				undefined,
				setSession(mockSession),
			);

			const state = authReducer(authenticatedState, setSession(null));

			expect(state.session).toBeNull();
			expect(state.isAuthenticated).toBe(false);
		});
	});

	describe("clearSession", () => {
		it("should reset to initial state", () => {
			const authenticatedState = authReducer(
				undefined,
				setSession(mockSession),
			);

			const state = authReducer(authenticatedState, clearSession());

			expect(state.session).toBeNull();
			expect(state.isAuthenticated).toBe(false);
		});
	});
});

