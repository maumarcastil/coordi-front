"use client";

import { useEffect } from "react";
import type { Session } from "next-auth";

import { useAppDispatch } from "../store/hooks";
import { clearSession, setSession } from "../store/slices/auth.slice";

interface IAuthProviderProps {
	session: Session | null;
	children: React.ReactNode;
}

export default function AuthProvider({
	session,
	children,
}: IAuthProviderProps) {
	const dispatch = useAppDispatch();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (session) {
			dispatch(setSession(session));
		} else {
			dispatch(clearSession());
		}
	}, [session]);

	return <>{children}</>;
}
