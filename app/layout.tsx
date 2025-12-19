import type { Metadata } from "next";
import ThemeRegistry from "@/shared/providers/ThemeRegistry";
import "./globals.css";

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
				<ThemeRegistry>{children}</ThemeRegistry>
			</body>
		</html>
	);
}
