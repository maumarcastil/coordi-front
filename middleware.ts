import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Rutas públicas (accesibles siempre, con o sin autenticación)
const publicRoutes = ["/"];

// Rutas que requieren autenticación
const protectedRoutes = ["/dashboard"];

// Rutas solo para usuarios NO autenticados
const authRoutes = ["/login", "/register"];

export default auth((req) => {
	const { nextUrl } = req;
	const isAuthenticated = !!req.auth;
	const pathname = nextUrl.pathname;

	// Rutas públicas: permitir acceso siempre
	const isPublicRoute = publicRoutes.some(
		(route) => pathname === route || pathname.startsWith(`${route}/`),
	);
	if (isPublicRoute) {
		return NextResponse.next();
	}

	// Rutas de auth: redirigir a dashboard si ya está autenticado
	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
	if (isAuthRoute && isAuthenticated) {
		return NextResponse.redirect(new URL("/dashboard", nextUrl));
	}

	// Rutas protegidas: redirigir a login si no está autenticado
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	);
	if (isProtectedRoute && !isAuthenticated) {
		return NextResponse.redirect(new URL("/login", nextUrl));
	}

	// Otras rutas: permitir acceso
	return NextResponse.next();
});

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|js|css|woff|woff2|ttf|eot)).*)",
	],
};
