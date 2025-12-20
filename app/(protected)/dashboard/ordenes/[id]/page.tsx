"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import type {
	OrderStatus,
	OrderStatusHistory,
} from "@/shared/types/order.types";

import {
	useOrderDetail,
	useOrderHistory,
} from "@/features/orders/hooks/useOrderDetail";

type Props = {
	params: Promise<{ id: string }>;
};

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

function formatDateTime(dateString: string): string {
	return new Date(dateString).toLocaleDateString("es-CO", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

function getStatusConfig(status: OrderStatus) {
	return statusConfig[status] || { label: status, color: "warning" as const };
}

interface TimelineItemProps {
	item: OrderStatusHistory;
	isFirst: boolean;
	isLast: boolean;
}

function TimelineItem({ item, isFirst, isLast }: TimelineItemProps) {
	const statusInfo = getStatusConfig(item.status);

	return (
		<Box sx={{ display: "flex", gap: 2 }}>
			{/* Línea vertical y punto */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					minWidth: 24,
				}}
			>
				{isFirst ? (
					<RadioButtonCheckedIcon
						color={statusInfo.color}
						sx={{ fontSize: 24 }}
					/>
				) : (
					<CheckCircleIcon color="disabled" sx={{ fontSize: 20 }} />
				)}
				{!isLast && (
					<Box
						sx={{
							width: 2,
							flexGrow: 1,
							bgcolor: "grey.300",
							minHeight: 40,
						}}
					/>
				)}
			</Box>

			{/* Contenido */}
			<Box sx={{ pb: isLast ? 0 : 3, flexGrow: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
					<Chip
						label={statusInfo.label}
						color={statusInfo.color}
						size="small"
						sx={{ fontWeight: 500 }}
					/>
				</Box>
				<Typography variant="body2" color="text.secondary">
					{formatDateTime(item.createdAt)}
				</Typography>
				{item.notes && (
					<Typography variant="body2" sx={{ mt: 0.5, fontStyle: "italic" }}>
						"{item.notes}"
					</Typography>
				)}
				{item.location && (
					<Typography variant="caption" color="text.secondary">
						📍 {item.location}
					</Typography>
				)}
			</Box>
		</Box>
	);
}

export default function DetalleOrdenPage({ params }: Props) {
	const { id } = use(params);
	const router = useRouter();

	const { data: orderData, isLoading: isLoadingOrder } = useOrderDetail(id);
	const { data: historyData, isLoading: isLoadingHistory } =
		useOrderHistory(id);

	const isLoading = isLoadingOrder || isLoadingHistory;
	const order = orderData?.order;
	const history = historyData?.history ?? [];

	// Ordenar historial de más reciente a más antiguo
	const sortedHistory = [...history].sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);

	const handleGoBack = () => {
		router.push("/dashboard/ordenes");
	};

	if (isLoading) {
		return (
			<Box>
				<Box sx={{ mb: 4 }}>
					<Button
						startIcon={<ArrowBackIcon />}
						onClick={handleGoBack}
						sx={{ mb: 2 }}
					>
						Volver a Órdenes
					</Button>
					<Typography variant="h4" fontWeight="bold" gutterBottom>
						Detalle de Orden
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

	if (!order) {
		return (
			<Box>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={handleGoBack}
					sx={{ mb: 2 }}
				>
					Volver a Órdenes
				</Button>
				<Typography variant="h5" color="error">
					Orden no encontrada
				</Typography>
			</Box>
		);
	}

	const statusInfo = getStatusConfig(order.currentStatus);

	return (
		<Box>
			{/* Header */}
			<Box sx={{ mb: 4 }}>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={handleGoBack}
					sx={{ mb: 2 }}
				>
					Volver a Órdenes
				</Button>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						flexWrap: "wrap",
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<LocalShippingIcon color="primary" sx={{ fontSize: 32 }} />
						<Typography variant="h4" fontWeight="bold">
							Orden #{order.id.slice(0, 8).toUpperCase()}
						</Typography>
					</Box>
					<Chip
						label={statusInfo.label}
						color={statusInfo.color}
						sx={{ fontWeight: 600, fontSize: "0.9rem" }}
					/>
				</Box>

				{order.trackingNumber && (
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ mt: 1, fontFamily: "monospace" }}
					>
						Tracking: {order.trackingNumber}
					</Typography>
				)}
			</Box>

			<Grid container spacing={3}>
				{/* Columna izquierda - Detalles de la orden */}
				<Grid size={{ xs: 12, md: 8 }}>
					{/* Remitente y Destinatario */}
					<Grid container spacing={2} sx={{ mb: 3 }}>
						<Grid size={{ xs: 12, sm: 6 }}>
							<Card>
								<CardContent>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 2,
										}}
									>
										<PersonIcon color="primary" />
										<Typography variant="h6" fontWeight="600">
											Remitente
										</Typography>
									</Box>
									<Typography variant="body1" fontWeight="500">
										{order.senderName}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{order.senderPhone}
									</Typography>
									<Divider sx={{ my: 1.5 }} />
									<Typography variant="body2">{order.senderAddress}</Typography>
									<Typography variant="body2" color="primary" fontWeight="500">
										{order.originCity.name}, {order.originCity.department}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										Código: {order.originCity.code}
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						<Grid size={{ xs: 12, sm: 6 }}>
							<Card>
								<CardContent>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 2,
										}}
									>
										<PersonIcon color="secondary" />
										<Typography variant="h6" fontWeight="600">
											Destinatario
										</Typography>
									</Box>
									<Typography variant="body1" fontWeight="500">
										{order.recipientName}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{order.recipientPhone}
									</Typography>
									<Divider sx={{ my: 1.5 }} />
									<Typography variant="body2">
										{order.recipientAddress}
									</Typography>
									<Typography
										variant="body2"
										color="secondary"
										fontWeight="500"
									>
										{order.destinationCity.name},{" "}
										{order.destinationCity.department}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										Código: {order.destinationCity.code}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>

					{/* Detalles del paquete */}
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Box
								sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
							>
								<InventoryIcon color="primary" />
								<Typography variant="h6" fontWeight="600">
									Detalles del Paquete
								</Typography>
							</Box>

							<Grid container spacing={2}>
								<Grid size={{ xs: 6, sm: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Peso
									</Typography>
									<Typography variant="body1" fontWeight="500">
										{order.weight} kg
									</Typography>
								</Grid>
								<Grid size={{ xs: 6, sm: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Dimensiones
									</Typography>
									<Typography variant="body1" fontWeight="500">
										{order.length} x {order.width} x {order.height} cm
									</Typography>
								</Grid>
								<Grid size={{ xs: 6, sm: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Peso Volumétrico
									</Typography>
									<Typography variant="body1" fontWeight="500">
										{order.volumetricWeight} kg
									</Typography>
								</Grid>
								<Grid size={{ xs: 6, sm: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Peso Cobrable
									</Typography>
									<Typography variant="body1" fontWeight="500">
										{order.chargeableWeight} kg
									</Typography>
								</Grid>
							</Grid>

							{order.packageDescription && (
								<Box sx={{ mt: 2 }}>
									<Typography variant="body2" color="text.secondary">
										Descripción
									</Typography>
									<Typography variant="body1">
										{order.packageDescription}
									</Typography>
								</Box>
							)}
						</CardContent>
					</Card>

					{/* Información de envío */}
					<Card>
						<CardContent>
							<Box
								sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
							>
								<PaymentIcon color="primary" />
								<Typography variant="h6" fontWeight="600">
									Información de Envío
								</Typography>
							</Box>

							<Grid container spacing={2}>
								<Grid size={{ xs: 6, sm: 4 }}>
									<Typography variant="body2" color="text.secondary">
										Precio Total
									</Typography>
									<Typography variant="h5" fontWeight="bold" color="primary">
										{formatCurrency(order.totalPrice)}
									</Typography>
								</Grid>
								<Grid size={{ xs: 6, sm: 4 }}>
									<Typography variant="body2" color="text.secondary">
										Fecha de Creación
									</Typography>
									<Typography variant="body1" fontWeight="500">
										{formatDate(order.createdAt)}
									</Typography>
								</Grid>
								{order.estimatedDeliveryDate && (
									<Grid size={{ xs: 6, sm: 4 }}>
										<Typography variant="body2" color="text.secondary">
											Entrega Estimada
										</Typography>
										<Typography variant="body1" fontWeight="500">
											{formatDate(order.estimatedDeliveryDate)}
										</Typography>
									</Grid>
								)}
								{order.deliveredAt && (
									<Grid size={{ xs: 6, sm: 4 }}>
										<Typography variant="body2" color="text.secondary">
											Fecha de Entrega
										</Typography>
										<Typography
											variant="body1"
											fontWeight="500"
											color="success.main"
										>
											{formatDate(order.deliveredAt)}
										</Typography>
									</Grid>
								)}
								{order.cancelledAt && (
									<Grid size={{ xs: 6, sm: 4 }}>
										<Typography variant="body2" color="text.secondary">
											Fecha de Cancelación
										</Typography>
										<Typography
											variant="body1"
											fontWeight="500"
											color="error.main"
										>
											{formatDate(order.cancelledAt)}
										</Typography>
									</Grid>
								)}
							</Grid>
						</CardContent>
					</Card>
				</Grid>

				{/* Columna derecha - Timeline de historial */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Paper sx={{ p: 3, position: "sticky", top: 24 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
							<HistoryIcon color="primary" />
							<Typography variant="h6" fontWeight="600">
								Historial de Estados
							</Typography>
						</Box>

						{sortedHistory.length === 0 ? (
							<Typography variant="body2" color="text.secondary">
								No hay historial disponible.
							</Typography>
						) : (
							<Box>
								{sortedHistory.map((item, index) => (
									<TimelineItem
										key={item.id}
										item={item}
										isFirst={index === 0}
										isLast={index === sortedHistory.length - 1}
									/>
								))}
							</Box>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}
