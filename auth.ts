import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginUser } from "@/shared/services/auth.service";
import type { LoginFormData } from "@/shared/types/auth.types";

declare module "next-auth" {
	interface User {
		accessToken?: string;
	}

	interface Session {
		accessToken?: string;
		user: DefaultSession["user"];
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					const data = await loginUser(credentials as LoginFormData);
					return {
						id: String(data.user.id),
						email: data.user.email,
						name: data.user.name,
						accessToken: data.token,
					};
				} catch {
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.accessToken = user.accessToken;
			}
			return token;
		},
		session: async ({ session, token }) => {
			session.accessToken = token.accessToken as string | undefined;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});
