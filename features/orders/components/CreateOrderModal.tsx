"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
	createOrderSchema,
	type CreateOrderFormData,
} from "@/features/orders/schemas/order.schema";
import { useCreateOrder } from "@/features/orders/hooks/useCreateOrder";
import type { OrderDetail } from "@/shared/types/order.types";
import type { Quote } from "@/shared/types/quote.types";

interface CreateOrderModalProps {
	open: boolean;
	onClose: () => void;
	quote: Quote | null;
	originCityName: string;
	destinationCityName: string;
}

function formatCurrency(value: number): string {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
	}).format(value);
}

export function CreateOrderModal({
	open,
	onClose,
	quote,
	originCityName,
	destinationCityName,
}: CreateOrderModalProps) {
	const [createdOrder, setCreatedOrder] = useState<OrderDetail | null>(null);
	const createOrderMutation = useCreateOrder();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateOrderFormData>({
		resolver: zodResolver(createOrderSchema),
		defaultValues: {
			senderName: "",
			senderPhone: "",
			senderAddress: "",
			recipientName: "",
			recipientPhone: "",
			recipientAddress: "",
			packageDescription: "",
		},
	});

	const handleClose = () => {
		if (!createOrderMutation.isPending) {
			reset();
			setCreatedOrder(null);
			createOrderMutation.reset();
			onClose();
		}
	};

	const onSubmit = async (data: CreateOrderFormData) => {
		if (!quote) return;

		try {
			const response = await createOrderMutation.mutateAsync({
				quoteId: quote.id,
				...data,
			});
			setCreatedOrder(response.order);
		} catch {
			// El error se maneja en el mutation
		}
	};

	if (!quote) return null;

	// Vista de confirmación de éxito
	if (createdOrder) {
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="sm"
				fullWidth
				PaperProps={{
					sx: { borderRadius: 2 },
				}}
			>
				<DialogContent>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							textAlign: "center",
							py: 4,
						}}
					>
						<CheckCircleIcon
							sx={{
								fontSize: 80,
								color: "success.main",
								mb: 2,
							}}
						/>
						<Typography variant="h5" fontWeight="bold" gutterBottom>
							¡Orden Creada Exitosamente!
						</Typography>
						<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
							Tu orden de envío ha sido registrada correctamente.
						</Typography>

						<Box
							sx={{
								bgcolor: "grey.50",
								borderRadius: 2,
								p: 2,
								width: "100%",
								mb: 3,
							}}
						>
							<Grid container spacing={2}>
								<Grid size={6}>
									<Typography variant="caption" color="text.secondary">
										ID de Orden
									</Typography>
									<Typography
										variant="body2"
										fontWeight="medium"
										sx={{
											fontFamily: "monospace",
											fontSize: "0.75rem",
											wordBreak: "break-all",
										}}
									>
										{createdOrder.id}
									</Typography>
								</Grid>
								<Grid size={6}>
									<Typography variant="caption" color="text.secondary">
										Precio Total
									</Typography>
									<Typography
										variant="body2"
										fontWeight="bold"
										color="primary.main"
									>
										{formatCurrency(createdOrder.totalPrice)}
									</Typography>
								</Grid>
								<Grid size={6}>
									<Typography variant="caption" color="text.secondary">
										Origen
									</Typography>
									<Typography variant="body2" fontWeight="medium">
										{originCityName}
									</Typography>
								</Grid>
								<Grid size={6}>
									<Typography variant="caption" color="text.secondary">
										Destino
									</Typography>
									<Typography variant="body2" fontWeight="medium">
										{destinationCityName}
									</Typography>
								</Grid>
							</Grid>
						</Box>

						<Box sx={{ display: "flex", gap: 2, width: "100%" }}>
							<Button variant="outlined" fullWidth onClick={handleClose}>
								Cerrar
							</Button>
							<Button
								variant="contained"
								fullWidth
								startIcon={<VisibilityIcon />}
								href={`/dashboard/ordenes/${createdOrder.id}`}
							>
								Ver Detalle
							</Button>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		);
	}

	// Vista del formulario
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: { borderRadius: 2 },
			}}
		>
			<DialogTitle sx={{ pb: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<LocalShippingIcon color="primary" />
					<Typography variant="h6" fontWeight="bold">
						Crear Orden de Envío
					</Typography>
				</Box>
			</DialogTitle>

			<DialogContent>
				{/* Resumen de la cotización */}
				<Box
					sx={{
						bgcolor: "grey.50",
						borderRadius: 2,
						p: 2,
						mb: 3,
					}}
				>
					<Typography variant="subtitle2" color="text.secondary" gutterBottom>
						Resumen de la Cotización
					</Typography>
					<Grid container spacing={2}>
						<Grid size={{ xs: 6, sm: 3 }}>
							<Typography variant="caption" color="text.secondary">
								Origen
							</Typography>
							<Typography variant="body2" fontWeight="medium">
								{originCityName}
							</Typography>
						</Grid>
						<Grid size={{ xs: 6, sm: 3 }}>
							<Typography variant="caption" color="text.secondary">
								Destino
							</Typography>
							<Typography variant="body2" fontWeight="medium">
								{destinationCityName}
							</Typography>
						</Grid>
						<Grid size={{ xs: 6, sm: 3 }}>
							<Typography variant="caption" color="text.secondary">
								Peso Cobrable
							</Typography>
							<Typography variant="body2" fontWeight="medium">
								{quote.chargeableWeight} kg
							</Typography>
						</Grid>
						<Grid size={{ xs: 6, sm: 3 }}>
							<Typography variant="caption" color="text.secondary">
								Precio Total
							</Typography>
							<Typography
								variant="body2"
								fontWeight="bold"
								color="primary.main"
							>
								{formatCurrency(quote.totalPrice)}
							</Typography>
						</Grid>
					</Grid>
				</Box>

				{createOrderMutation.isError && (
					<Alert severity="error" sx={{ mb: 3 }}>
						Error al crear la orden. Por favor intenta de nuevo.
					</Alert>
				)}

				<Box
					component="form"
					id="create-order-form"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Datos del Remitente */}
					<Box sx={{ mb: 3 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
							<PersonIcon color="primary" fontSize="small" />
							<Typography variant="subtitle1" fontWeight="medium">
								Datos del Remitente
							</Typography>
						</Box>
						<Grid container spacing={2}>
							<Grid size={{ xs: 12, sm: 6 }}>
								<Controller
									name="senderName"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label="Nombre completo"
											fullWidth
											error={!!errors.senderName}
											helperText={errors.senderName?.message}
										/>
									)}
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<Controller
									name="senderPhone"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label="Teléfono"
											fullWidth
											error={!!errors.senderPhone}
											helperText={errors.senderPhone?.message}
										/>
									)}
								/>
							</Grid>
							<Grid size={12}>
								<Controller
									name="senderAddress"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label="Dirección completa"
											fullWidth
											multiline
											rows={2}
											error={!!errors.senderAddress}
											helperText={errors.senderAddress?.message}
										/>
									)}
								/>
							</Grid>
						</Grid>
					</Box>

					<Divider sx={{ my: 3 }} />

					{/* Datos del Destinatario */}
					<Box sx={{ mb: 3 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
							<PlaceIcon color="secondary" fontSize="small" />
							<Typography variant="subtitle1" fontWeight="medium">
								Datos del Destinatario
							</Typography>
						</Box>
						<Grid container spacing={2}>
							<Grid size={{ xs: 12, sm: 6 }}>
								<Controller
									name="recipientName"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label="Nombre completo"
											fullWidth
											error={!!errors.recipientName}
											helperText={errors.recipientName?.message}
										/>
									)}
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<Controller
									name="recipientPhone"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label="Teléfono"
											fullWidth
											error={!!errors.recipientPhone}
											helperText={errors.recipientPhone?.message}
										/>
									)}
								/>
							</Grid>
							<Grid size={12}>
								<Controller
									name="recipientAddress"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label="Dirección completa"
											fullWidth
											multiline
											rows={2}
											error={!!errors.recipientAddress}
											helperText={errors.recipientAddress?.message}
										/>
									)}
								/>
							</Grid>
						</Grid>
					</Box>

					<Divider sx={{ my: 3 }} />

					{/* Descripción del paquete */}
					<Box>
						<Typography variant="subtitle1" fontWeight="medium" gutterBottom>
							Descripción del Paquete (Opcional)
						</Typography>
						<Controller
							name="packageDescription"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="¿Qué contiene el paquete?"
									fullWidth
									multiline
									rows={2}
									placeholder="Ej: Documentos, ropa, electrónicos..."
								/>
							)}
						/>
					</Box>
				</Box>
			</DialogContent>

			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button
					onClick={handleClose}
					disabled={createOrderMutation.isPending}
					color="inherit"
				>
					Cancelar
				</Button>
				<Button
					type="submit"
					form="create-order-form"
					variant="contained"
					disabled={createOrderMutation.isPending}
					startIcon={
						createOrderMutation.isPending ? (
							<CircularProgress size={20} color="inherit" />
						) : (
							<LocalShippingIcon />
						)
					}
				>
					{createOrderMutation.isPending ? "Creando..." : "Crear Orden"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default CreateOrderModal;
