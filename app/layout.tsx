import "./globals.css";

import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import AuthProvider from "@/shared/providers/AuthProvider";
import QueryProvider from "@/shared/providers/QueryProvider";
import StoreProvider from "@/shared/providers/StoreProvider";
import ThemeRegistry from "@/shared/providers/ThemeRegistry";

export const metadata: Metadata = {
	title: "Coordi - Envíos Rápidos",
	description: "Soluciones de logística y mensajería",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="es">
			<body>
				<QueryProvider>
					<StoreProvider>
						<SessionProvider session={session}>
							<AuthProvider session={session}>
								<ThemeRegistry>{children}</ThemeRegistry>
							</AuthProvider>
						</SessionProvider>
					</StoreProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
