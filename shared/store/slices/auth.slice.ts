import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Session } from "next-auth";

interface AuthState {
	session: Session | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	session: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setSession: (state, action: PayloadAction<Session | null>) => {
			state.session = action.payload;
			state.isAuthenticated = !!action.payload;
		},
		clearSession: (state) => {
			state.session = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
