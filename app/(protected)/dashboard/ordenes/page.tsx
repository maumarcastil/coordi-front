"use client";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InboxIcon from "@mui/icons-material/Inbox";
import VisibilityIcon from "@mui/icons-material/Visibility";

import type { Order, OrderStatus } from "@/shared/types/order.types";

import { useUserOrders } from "@/features/orders/hooks/useUserOrders";

const statusConfig: Record<
	OrderStatus,
	{ label: string; color: "warning" | "info" | "primary" | "success" | "error" }
> = {
	pending: { label: "Pendiente", color: "warning" },
	confirmed: { label: "Confirmada", color: "info" },
	in_transit: { label: "En Tránsito", color: "primary" },
	delivered: { label: "Entregada", color: "success" },
	cancelled: { label: "Cancelada", color: "error" },
};

function formatCurrency(value: number): string {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
	}).format(value);
}

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString("es-CO", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

export default function OrdenesPage() {
	const router = useRouter();
	const { data: ordersData, isLoading } = useUserOrders();

	const orders = ordersData?.orders ?? [];

	const getStatusConfig = (status: OrderStatus) => {
		return statusConfig[status] || { label: status, color: "warning" as const };
	};

	const handleViewDetails = (orderId: string) => {
		router.push(`/dashboard/ordenes/${orderId}`);
	};

	if (isLoading) {
		return (
			<Box>
				<Box sx={{ mb: 4 }}>
					<Typography variant="h4" fontWeight="bold" gutterBottom>
						Órdenes de Envío
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Gestiona y rastrea todas las órdenes de envío.
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: 300,
					}}
				>
					<CircularProgress />
				</Box>
			</Box>
		);
	}

	return (
		<Box>
			{/* Header */}
			<Box sx={{ mb: 4 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
					<LocalShippingIcon color="primary" sx={{ fontSize: 32 }} />
					<Typography variant="h4" fontWeight="bold">
						Órdenes de Envío
					</Typography>
				</Box>
				<Typography variant="body1" color="text.secondary">
					Historial de órdenes de envío realizadas.
				</Typography>
			</Box>

			{/* Tabla de órdenes */}
			<Card>
				<CardContent sx={{ p: 0 }}>
					{orders.length === 0 ? (
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								py: 8,
								px: 3,
							}}
						>
							<InboxIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
							<Typography variant="h6" color="text.secondary" gutterBottom>
								No tienes órdenes aún
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								textAlign="center"
							>
								Crea tu primera orden desde una cotización para ver el historial
								aquí.
							</Typography>
						</Box>
					) : (
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow sx={{ bgcolor: "grey.50" }}>
										<TableCell sx={{ fontWeight: 600 }}>Tracking</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Origen</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Destino</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Remitente</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Destinatario</TableCell>
										<TableCell sx={{ fontWeight: 600 }} align="right">
											Precio
										</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
										<TableCell sx={{ fontWeight: 600 }} align="center">
											Acciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orders.map((order: Order) => {
										const statusInfo = getStatusConfig(order.currentStatus);
										return (
											<TableRow
												key={order.id}
												sx={{
													"&:hover": { bgcolor: "grey.50" },
													"&:last-child td": { border: 0 },
												}}
											>
												<TableCell>
													<Typography
														variant="body2"
														fontWeight="medium"
														sx={{ fontFamily: "monospace" }}
													>
														{order.trackingNumber || "—"}
													</Typography>
												</TableCell>
												<TableCell>{order.originCityName}</TableCell>
												<TableCell>{order.destinationCityName}</TableCell>
												<TableCell>
													<Typography variant="body2">
														{order.senderName}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="body2">
														{order.recipientName}
													</Typography>
												</TableCell>
												<TableCell align="right">
													<Typography fontWeight="medium" color="primary.main">
														{formatCurrency(order.totalPrice)}
													</Typography>
												</TableCell>
												<TableCell>
													<Chip
														label={statusInfo.label}
														color={statusInfo.color}
														size="small"
														sx={{ fontWeight: 500 }}
													/>
												</TableCell>
												<TableCell>
													<Typography variant="body2" color="text.secondary">
														{formatDate(order.createdAt)}
													</Typography>
												</TableCell>
												<TableCell align="center">
													<Button
														variant="outlined"
														size="small"
														startIcon={<VisibilityIcon />}
														onClick={() => handleViewDetails(order.id)}
													>
														Ver Detalle
													</Button>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</CardContent>
			</Card>

			{/* Resumen */}
			{orders.length > 0 && (
				<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
					<Typography variant="body2" color="text.secondary">
						Mostrando {orders.length} orden
						{orders.length !== 1 ? "es" : ""}
					</Typography>
				</Box>
			)}
		</Box>
	);
}
