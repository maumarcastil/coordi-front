"use client";

import Link from "next/link";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PublicIcon from "@mui/icons-material/Public";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "@/shared/store/hooks";

export default function LandingPage() {
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			{/* Navbar */}
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: "1px solid #e0e0e0" }}
			>
				<Container maxWidth="lg">
					<Toolbar disableGutters>
						<Link href="/" style={{ textDecoration: "none", flexGrow: 1 }}>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{
									fontWeight: "bold",
									color: "primary.main",
									display: "flex",
									alignItems: "center",
									"&:hover": {
										opacity: 0.8,
									},
								}}
							>
								<LocalShippingIcon sx={{ mr: 1 }} /> COORDI
							</Typography>
						</Link>
						<Button
							component={Link}
							href={isAuthenticated ? "/dashboard" : "/login"}
							variant="contained"
							color="primary"
						>
							{isAuthenticated ? "Ir al Dashboard" : "Ingresar"}
						</Button>
					</Toolbar>
				</Container>
			</AppBar>

			{/* Hero Section */}
			<Box
				sx={{
					bgcolor: "primary.main",
					color: "white",
					py: 8,
					backgroundImage: "linear-gradient(45deg, #003B95 30%, #0055cc 90%)",
				}}
			>
				<Container maxWidth="md">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						gutterBottom
						sx={{ fontWeight: 800 }}
					>
						Envíos Rápidos y Seguros
					</Typography>
					<Typography
						variant="h5"
						align="center"
						paragraph
						sx={{ opacity: 0.9 }}
					>
						Soluciones logísticas integrales para tus paquetes y documentos.
						Llegamos a cada rincón del país con la confianza que necesitas.
					</Typography>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						justifyContent="center"
						alignItems="center"
						sx={{ mt: 4 }}
					>
						<Tooltip title="Próximamente" arrow>
							<span>
								<Button
									variant="contained"
									color="secondary"
									size="large"
									disabled
									sx={{
										color: "black",
										fontWeight: "bold",
										"&.Mui-disabled": {
											bgcolor: "rgba(255,255,255,0.3)",
											color: "rgba(255,255,255,0.7)",
										},
									}}
								>
									Rastrear Guía
								</Button>
							</span>
						</Tooltip>
						<Button
							component={Link}
							href={isAuthenticated ? "/dashboard" : "/login"}
							variant="outlined"
							size="large"
							sx={{
								color: "white",
								borderColor: "white",
								"&:hover": {
									borderColor: "white",
									bgcolor: "rgba(255,255,255,0.1)",
								},
							}}
						>
							{isAuthenticated ? "Ir a Cotizar" : "Cotizar Envío"}
						</Button>
					</Stack>
				</Container>
			</Box>

			{/* Services Section */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Typography
					variant="h3"
					align="center"
					gutterBottom
					color="text.primary"
					sx={{ mb: 6, fontWeight: "bold" }}
				>
					Nuestros Servicios
				</Typography>
				<Grid container spacing={4}>
					{[
						{
							title: "Paquetería Nacional",
							desc: "Envíos a todo el país con tiempos de entrega garantizados.",
							icon: <LocalShippingIcon fontSize="large" color="primary" />,
						},
						{
							title: "Envíos Internacionales",
							desc: "Conectamos tu negocio con el mundo. Cobertura global.",
							icon: <PublicIcon fontSize="large" color="primary" />,
						},
						{
							title: "Logística Empresarial",
							desc: "Soluciones a medida para e-commerce y grandes volúmenes.",
							icon: <SupportAgentIcon fontSize="large" color="primary" />,
						},
					].map((service) => (
						<Grid size={{ xs: 12, md: 4 }} key={service.title}>
							<Card
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									textAlign: "center",
									p: 2,
									boxShadow: 3,
								}}
							>
								<CardContent>
									<Box sx={{ mb: 2 }}>{service.icon}</Box>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
										fontWeight="bold"
									>
										{service.title}
									</Typography>
									<Typography>{service.desc}</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* How it works / Agenda Style */}
			<Box sx={{ bgcolor: "background.default", py: 8 }}>
				<Container maxWidth="lg">
					<Typography
						variant="h3"
						align="center"
						gutterBottom
						color="text.primary"
						sx={{ mb: 6, fontWeight: "bold" }}
					>
						¿Cómo funciona?
					</Typography>
					<Stack spacing={4}>
						{[
							{
								step: "01",
								title: "Cotiza tu envío",
								detail:
									"Ingresa origen, destino y peso para obtener tu tarifa.",
							},
							{
								step: "02",
								title: "Solicita recolección",
								detail:
									"Programamos la recogida en la puerta de tu casa o empresa.",
							},
							{
								step: "03",
								title: "Rastrea en tiempo real",
								detail: "Monitorea el estado de tu paquete hasta su entrega.",
							},
						].map((item) => (
							<Box
								key={item.step}
								sx={{
									display: "flex",
									alignItems: "center",
									bgcolor: "white",
									p: 3,
									borderRadius: 2,
									boxShadow: 1,
								}}
							>
								<Typography
									variant="h2"
									sx={{
										color: "secondary.main",
										fontWeight: "900",
										mr: 4,
										width: "80px",
									}}
								>
									{item.step}
								</Typography>
								<Box>
									<Typography variant="h5" fontWeight="bold" gutterBottom>
										{item.title}
									</Typography>
									<Typography variant="body1" color="text.secondary">
										{item.detail}
									</Typography>
								</Box>
							</Box>
						))}
					</Stack>
				</Container>
			</Box>

			{/* Footer */}
			<Box
				component="footer"
				sx={{ bgcolor: "primary.main", color: "white", py: 6, mt: "auto" }}
			>
				<Container maxWidth="lg">
					<Grid container spacing={4}>
						<Grid size={{ xs: 12, md: 4 }}>
							<Typography variant="h6" gutterBottom fontWeight="bold">
								COORDI
							</Typography>
							<Typography variant="body2">
								Tu aliado logístico de confianza. Llegamos donde otros no
								llegan.
							</Typography>
						</Grid>
						<Grid size={{ xs: 6, md: 4 }}>
							<Typography variant="h6" gutterBottom fontWeight="bold">
								Enlaces Rápidos
							</Typography>
							<Stack spacing={1}>
								<Typography
									variant="body2"
									component="a"
									href="#"
									sx={{ color: "inherit", textDecoration: "none" }}
								>
									Rastreo
								</Typography>
								<Typography
									variant="body2"
									component="a"
									href="#"
									sx={{ color: "inherit", textDecoration: "none" }}
								>
									Cotizador
								</Typography>
								<Typography
									variant="body2"
									component="a"
									href="#"
									sx={{ color: "inherit", textDecoration: "none" }}
								>
									Puntos de Servicio
								</Typography>
							</Stack>
						</Grid>
						<Grid size={{ xs: 6, md: 4 }}>
							<Typography variant="h6" gutterBottom fontWeight="bold">
								Contacto
							</Typography>
							<Typography variant="body2">
								Línea Nacional: 01 8000 123 456
							</Typography>
							<Typography variant="body2">
								Email: contacto@coordi.com
							</Typography>
						</Grid>
					</Grid>
					<Box
						sx={{
							mt: 4,
							pt: 4,
							borderTop: "1px solid rgba(255,255,255,0.2)",
							textAlign: "center",
						}}
					>
						<Typography variant="body2" sx={{ opacity: 0.7 }}>
							© {new Date().getFullYear()} Coordi. Todos los derechos
							reservados.
						</Typography>
					</Box>
				</Container>
			</Box>
		</Box>
	);
}
