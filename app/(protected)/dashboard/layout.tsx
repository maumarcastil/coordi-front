// TODO: Agregar validación de autenticación aquí
// Por ejemplo: verificar token, redirigir a /login si no está autenticado

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
