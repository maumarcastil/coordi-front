import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import QuoteForm from "@/features/quotes/components/QuoteForm";

// Datos de ejemplo
const stats = [
	{
		title: "Envíos del Mes",
		value: "156",
		change: "+12%",
		trend: "up",
		icon: LocalShippingIcon,
		color: "#003B95",
		bgColor: "#e8f0fe",
	},
	{
		title: "Cotizaciones",
		value: "43",
		change: "+8%",
		trend: "up",
		icon: ReceiptLongIcon,
		color: "#7c3aed",
		bgColor: "#f3e8ff",
	},
	{
		title: "Paquetes en Tránsito",
		value: "28",
		change: "-3%",
		trend: "down",
		icon: InventoryIcon,
		color: "#d97706",
		bgColor: "#fef3c7",
	},
	{
		title: "Facturado",
		value: "$4.2M",
		change: "+18%",
		trend: "up",
		icon: PaidIcon,
		color: "#059669",
		bgColor: "#d1fae5",
	},
];

const weeklyActivity = [
	{ day: "Lun", shipments: 24, delivered: 22 },
	{ day: "Mar", shipments: 31, delivered: 28 },
	{ day: "Mié", shipments: 18, delivered: 17 },
	{ day: "Jue", shipments: 42, delivered: 38 },
	{ day: "Vie", shipments: 35, delivered: 33 },
	{ day: "Sáb", shipments: 12, delivered: 11 },
	{ day: "Dom", shipments: 6, delivered: 5 },
];

const maxShipments = Math.max(...weeklyActivity.map((d) => d.shipments));

const topRoutes = [
	{ route: "Bogotá → Medellín", shipments: 45, percentage: 85 },
	{ route: "Cali → Bogotá", shipments: 38, percentage: 72 },
	{ route: "Barranquilla → Cartagena", shipments: 29, percentage: 55 },
];

export default function DashboardPage() {
	return (
		<Box>
			{/* Header */}
			<Box sx={{ mb: 4 }}>
				<Typography variant="h4" fontWeight="bold" gutterBottom>
					Dashboard
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Resumen de tu actividad de envíos y cotizaciones
				</Typography>
			</Box>

			{/* Formulario de Cotización - Protagonista */}
			<Box sx={{ mb: 4 }}>
				<QuoteForm />
			</Box>

			{/* Stats Cards */}
			<Grid container spacing={3} sx={{ mb: 4 }}>
				{stats.map((stat) => (
					<Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.title}>
						<Card>
							<CardContent sx={{ p: 2.5 }}>
								<Box
									sx={{
										display: "flex",
										alignItems: "flex-start",
										justifyContent: "space-between",
									}}
								>
									<Box>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{ mb: 0.5 }}
										>
											{stat.title}
										</Typography>
										<Typography variant="h5" fontWeight="bold">
											{stat.value}
										</Typography>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												mt: 0.5,
												gap: 0.5,
											}}
										>
											{stat.trend === "up" ? (
												<TrendingUpIcon
													sx={{ fontSize: 14, color: "success.main" }}
												/>
											) : (
												<TrendingDownIcon
													sx={{ fontSize: 14, color: "error.main" }}
												/>
											)}
											<Typography
												variant="caption"
												sx={{
													color:
														stat.trend === "up" ? "success.main" : "error.main",
													fontWeight: 600,
												}}
											>
												{stat.change}
											</Typography>
										</Box>
									</Box>
									<Avatar
										sx={{
											bgcolor: stat.bgColor,
											width: 44,
											height: 44,
										}}
									>
										<stat.icon sx={{ color: stat.color, fontSize: 22 }} />
									</Avatar>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* Contenido Secundario */}
			<Grid container spacing={3}>
				{/* Actividad Semanal */}
				<Grid size={{ xs: 12, lg: 8 }}>
					<Card sx={{ height: "100%" }}>
						<CardContent sx={{ p: 3 }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									mb: 3,
								}}
							>
								<Box>
									<Typography variant="h6" fontWeight="bold">
										Actividad Semanal
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Envíos totales vs entregados esta semana
									</Typography>
								</Box>
								<Box sx={{ display: "flex", gap: 2 }}>
									<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
										<Box
											sx={{
												width: 12,
												height: 12,
												borderRadius: 1,
												bgcolor: "#003B95",
											}}
										/>
										<Typography variant="caption" color="text.secondary">
											Enviados
										</Typography>
									</Box>
									<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
										<Box
											sx={{
												width: 12,
												height: 12,
												borderRadius: 1,
												bgcolor: "#059669",
											}}
										/>
										<Typography variant="caption" color="text.secondary">
											Entregados
										</Typography>
									</Box>
								</Box>
							</Box>

							{/* Gráfico de barras */}
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-end",
									justifyContent: "space-between",
									height: 200,
									gap: 1,
									pt: 2,
								}}
							>
								{weeklyActivity.map((day) => (
									<Box
										key={day.day}
										sx={{
											flex: 1,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: 1,
										}}
									>
										{/* Barras */}
										<Box
											sx={{
												display: "flex",
												alignItems: "flex-end",
												gap: 0.5,
												height: 160,
											}}
										>
											{/* Barra de enviados */}
											<Box
												sx={{
													width: 20,
													height: `${(day.shipments / maxShipments) * 100}%`,
													bgcolor: "#003B95",
													borderRadius: "4px 4px 0 0",
													transition: "height 0.3s ease",
													"&:hover": {
														opacity: 0.8,
													},
												}}
											/>
											{/* Barra de entregados */}
											<Box
												sx={{
													width: 20,
													height: `${(day.delivered / maxShipments) * 100}%`,
													bgcolor: "#059669",
													borderRadius: "4px 4px 0 0",
													transition: "height 0.3s ease",
													"&:hover": {
														opacity: 0.8,
													},
												}}
											/>
										</Box>
										{/* Etiqueta del día */}
										<Typography
											variant="caption"
											color="text.secondary"
											fontWeight={500}
										>
											{day.day}
										</Typography>
									</Box>
								))}
							</Box>

							{/* Resumen */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									gap: 4,
									mt: 3,
									pt: 2,
									borderTop: 1,
									borderColor: "divider",
								}}
							>
								<Box sx={{ textAlign: "center" }}>
									<Typography variant="h5" fontWeight="bold" color="#003B95">
										{weeklyActivity.reduce((sum, d) => sum + d.shipments, 0)}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										Total enviados
									</Typography>
								</Box>
								<Box sx={{ textAlign: "center" }}>
									<Typography variant="h5" fontWeight="bold" color="#059669">
										{weeklyActivity.reduce((sum, d) => sum + d.delivered, 0)}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										Total entregados
									</Typography>
								</Box>
								<Box sx={{ textAlign: "center" }}>
									<Typography
										variant="h5"
										fontWeight="bold"
										color="text.primary"
									>
										{Math.round(
											(weeklyActivity.reduce((sum, d) => sum + d.delivered, 0) /
												weeklyActivity.reduce(
													(sum, d) => sum + d.shipments,
													0,
												)) *
												100,
										)}
										%
									</Typography>
									<Typography variant="caption" color="text.secondary">
										Tasa de entrega
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>

				{/* Rutas Principales */}
				<Grid size={{ xs: 12, lg: 4 }}>
					<Card sx={{ height: "100%" }}>
						<CardContent sx={{ p: 3 }}>
							<Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
								Rutas Principales
							</Typography>
							<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
								{topRoutes.map((route) => (
									<Box key={route.route}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												mb: 0.5,
											}}
										>
											<Typography variant="body2" fontWeight="medium">
												{route.route}
											</Typography>
											<Typography variant="caption" color="text.secondary">
												{route.shipments}
											</Typography>
										</Box>
										<LinearProgress
											variant="determinate"
											value={route.percentage}
											sx={{
												height: 6,
												borderRadius: 3,
												bgcolor: "grey.200",
												"& .MuiLinearProgress-bar": {
													borderRadius: 3,
												},
											}}
										/>
									</Box>
								))}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}
