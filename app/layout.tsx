import "./globals.css";

import type { Metadata } from "next";

import QueryProvider from "@/shared/providers/QueryProvider";
import StoreProvider from "@/shared/providers/StoreProvider";
import ThemeRegistry from "@/shared/providers/ThemeRegistry";

export const metadata: Metadata = {
	title: "Coordi - Envíos Rápidos",
	description: "Soluciones de logística y mensajería",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body>
				<QueryProvider>
					<StoreProvider>
						<ThemeRegistry>{children}</ThemeRegistry>
					</StoreProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
