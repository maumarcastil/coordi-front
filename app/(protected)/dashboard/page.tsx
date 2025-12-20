import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

const recentShipments = [
	{
		id: "ENV-2024-001",
		origin: "Bogotá",
		destination: "Medellín",
		status: "En tránsito",
		statusColor: "warning",
		date: "20 Dic 2024",
	},
	{
		id: "ENV-2024-002",
		origin: "Cali",
		destination: "Barranquilla",
		status: "Entregado",
		statusColor: "success",
		date: "19 Dic 2024",
	},
	{
		id: "ENV-2024-003",
		origin: "Cartagena",
		destination: "Bogotá",
		status: "En bodega",
		statusColor: "info",
		date: "19 Dic 2024",
	},
	{
		id: "ENV-2024-004",
		origin: "Medellín",
		destination: "Pereira",
		status: "En tránsito",
		statusColor: "warning",
		date: "18 Dic 2024",
	},
];

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
				{/* Envíos Recientes */}
				<Grid size={{ xs: 12, lg: 8 }}>
					<Card sx={{ height: "100%" }}>
						<CardContent sx={{ p: 3 }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									mb: 2,
								}}
							>
								<Typography variant="h6" fontWeight="bold">
									Envíos Recientes
								</Typography>
								<Typography
									variant="body2"
									color="primary"
									sx={{ cursor: "pointer", fontWeight: 500 }}
								>
									Ver todos →
								</Typography>
							</Box>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Origen</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Destino</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{recentShipments.map((shipment) => (
										<TableRow
											key={shipment.id}
											sx={{ "&:last-child td": { border: 0 } }}
										>
											<TableCell>
												<Typography variant="body2" fontWeight="medium">
													{shipment.id}
												</Typography>
											</TableCell>
											<TableCell>{shipment.origin}</TableCell>
											<TableCell>{shipment.destination}</TableCell>
											<TableCell>
												<Chip
													label={shipment.status}
													color={
														shipment.statusColor as
															| "warning"
															| "success"
															| "info"
													}
													size="small"
													sx={{ fontWeight: 500 }}
												/>
											</TableCell>
											<TableCell>
												<Typography variant="body2" color="text.secondary">
													{shipment.date}
												</Typography>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
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
