"use client";

import { useMemo } from "react";

import Box from "@mui/material/Box";
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
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InboxIcon from "@mui/icons-material/Inbox";

import { useUserQuotes } from "@/features/quotes/hooks/useUserQuotes";
import { useCities } from "@/features/cities/hooks/useCities";
import type { Quote } from "@/shared/types/quote.types";

const statusConfig: Record<
	string,
	{ label: string; color: "warning" | "success" | "error" }
> = {
	pending: { label: "Pendiente", color: "warning" },
	converted: { label: "Convertida", color: "success" },
	expired: { label: "Expirada", color: "error" },
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

export default function CotizacionesPage() {
	const { data: quotesData, isLoading: isLoadingQuotes } = useUserQuotes();
	const { data: citiesData, isLoading: isLoadingCities } = useCities();

	const isLoading = isLoadingQuotes || isLoadingCities;
	const quotes = quotesData?.quotes ?? [];
	const cities = citiesData?.cities ?? [];

	// Crear mapa de ciudades para lookup rápido
	const citiesMap = useMemo(() => {
		return cities.reduce(
			(acc, city) => {
				acc[city.id] = city.name;
				return acc;
			},
			{} as Record<number, string>,
		);
	}, [cities]);

	const getCityName = (cityId: number): string => {
		return citiesMap[cityId] || `Ciudad #${cityId}`;
	};

	const getStatusConfig = (status: string) => {
		return statusConfig[status] || { label: status, color: "warning" as const };
	};

	if (isLoading) {
		return (
			<Box>
				<Box sx={{ mb: 4 }}>
					<Typography variant="h4" fontWeight="bold" gutterBottom>
						Cotizaciones
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Gestiona las cotizaciones de envío para tus clientes.
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
					<ReceiptLongIcon color="primary" sx={{ fontSize: 32 }} />
					<Typography variant="h4" fontWeight="bold">
						Cotizaciones
					</Typography>
				</Box>
				<Typography variant="body1" color="text.secondary">
					Historial de cotizaciones de envío realizadas.
				</Typography>
			</Box>

			{/* Tabla de cotizaciones */}
			<Card>
				<CardContent sx={{ p: 0 }}>
					{quotes.length === 0 ? (
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
								No tienes cotizaciones aún
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								textAlign="center"
							>
								Crea tu primera cotización desde el dashboard para ver el
								historial aquí.
							</Typography>
						</Box>
					) : (
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow sx={{ bgcolor: "grey.50" }}>
										<TableCell sx={{ fontWeight: 600 }}>Origen</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Destino</TableCell>
										<TableCell sx={{ fontWeight: 600 }} align="right">
											Peso (kg)
										</TableCell>
										<TableCell sx={{ fontWeight: 600 }} align="right">
											Peso Vol.
										</TableCell>
										<TableCell sx={{ fontWeight: 600 }} align="right">
											Peso Cobrable
										</TableCell>
										<TableCell sx={{ fontWeight: 600 }} align="right">
											Precio
										</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
										<TableCell sx={{ fontWeight: 600 }}>Creado</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{quotes.map((quote: Quote) => {
										const statusInfo = getStatusConfig(quote.status);
										return (
											<TableRow
												key={quote.id}
												sx={{
													"&:hover": { bgcolor: "grey.50" },
													"&:last-child td": { border: 0 },
												}}
											>
												<TableCell>{getCityName(quote.originCityId)}</TableCell>
												<TableCell>
													{getCityName(quote.destinationCityId)}
												</TableCell>
												<TableCell align="right">
													{quote.weight.toFixed(1)}
												</TableCell>
												<TableCell align="right">
													{quote.volumetricWeight != null
														? quote.volumetricWeight.toFixed(1)
														: "—"}
												</TableCell>
												<TableCell align="right">
													{quote.chargeableWeight.toFixed(1)}
												</TableCell>
												<TableCell align="right">
													<Typography fontWeight="medium" color="primary.main">
														{formatCurrency(quote.totalPrice)}
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
														{formatDate(quote.createdAt)}
													</Typography>
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
			{quotes.length > 0 && (
				<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
					<Typography variant="body2" color="text.secondary">
						Mostrando {quotes.length} cotización
						{quotes.length !== 1 ? "es" : ""}
					</Typography>
				</Box>
			)}
		</Box>
	);
}
