"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CalculateIcon from "@mui/icons-material/Calculate";
import HistoryIcon from "@mui/icons-material/History";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import {
	quoteSchema,
	type QuoteFormData,
} from "@/features/quotes/schemas/quote.schema";
import { useCities } from "@/features/cities/hooks/useCities";
import { useCreateQuote } from "@/features/quotes/hooks/useQuotesMutation";
import type { City } from "@/shared/types/city.types";
import type { Quote } from "@/shared/types/quote.types";

export default function QuoteForm() {
	const [quoteResult, setQuoteResult] = useState<Quote | null>(null);

	const { data: citiesData, isLoading: isLoadingCities } = useCities();
	const createQuoteMutation = useCreateQuote();

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<QuoteFormData>({
		resolver: zodResolver(quoteSchema),
	});

	const cities = citiesData?.cities ?? [];

	// Observar valores seleccionados para filtrar opciones
	const selectedOriginId = watch("originCityId");
	const selectedDestinationId = watch("destinationCityId");

	// Filtrar opciones: excluir la ciudad seleccionada en el campo opuesto
	const originCityOptions = cities.filter(
		(c) => c.id !== selectedDestinationId,
	);
	const destinationCityOptions = cities.filter(
		(c) => c.id !== selectedOriginId,
	);

	const onSubmit = async (data: QuoteFormData) => {
		setQuoteResult(null);
		try {
			const response = await createQuoteMutation.mutateAsync(data);
			setQuoteResult(response.quote);
		} catch {
			// El error se maneja en el mutation
		}
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("es-CO", {
			style: "currency",
			currency: "COP",
			minimumFractionDigits: 0,
		}).format(value);
	};

	return (
		<Card sx={{ boxShadow: 2 }}>
			<CardContent sx={{ p: 3 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
					<LocalShippingIcon color="primary" />
					<Typography variant="h6" fontWeight="bold">
						Nueva Cotización de Envío
					</Typography>
				</Box>

				{createQuoteMutation.isError && (
					<Alert severity="error" sx={{ mb: 3 }}>
						Error al crear la cotización. Por favor intenta de nuevo.
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
					<Grid container spacing={3}>
						{/* Ciudad de Origen */}
						<Grid size={{ xs: 12, md: 6 }}>
							<Controller
								name="originCityId"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										options={originCityOptions}
										getOptionLabel={(option: City) =>
											`${option.name} - ${option.department}`
										}
										loading={isLoadingCities}
										value={cities.find((c) => c.id === value) || null}
										onChange={(_, newValue) => onChange(newValue?.id)}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Ciudad de Origen"
												error={!!errors.originCityId}
												helperText={errors.originCityId?.message}
												slotProps={{
													input: {
														...params.InputProps,
														endAdornment: (
															<>
																{isLoadingCities ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													},
												}}
											/>
										)}
									/>
								)}
							/>
						</Grid>

						{/* Ciudad de Destino */}
						<Grid size={{ xs: 12, md: 6 }}>
							<Controller
								name="destinationCityId"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										options={destinationCityOptions}
										getOptionLabel={(option: City) =>
											`${option.name} - ${option.department}`
										}
										loading={isLoadingCities}
										value={cities.find((c) => c.id === value) || null}
										onChange={(_, newValue) => onChange(newValue?.id)}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Ciudad de Destino"
												error={!!errors.destinationCityId}
												helperText={errors.destinationCityId?.message}
												slotProps={{
													input: {
														...params.InputProps,
														endAdornment: (
															<>
																{isLoadingCities ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													},
												}}
											/>
										)}
									/>
								)}
							/>
						</Grid>

						{/* Peso */}
						<Grid size={{ xs: 12, md: 6 }}>
							<Controller
								name="weight"
								control={control}
								render={({ field: { onChange, value } }) => (
									<TextField
										label="Peso"
										type="number"
										fullWidth
										value={value ?? ""}
										onChange={(e) =>
											onChange(
												e.target.value
													? Number.parseFloat(e.target.value)
													: undefined,
											)
										}
										error={!!errors.weight}
										helperText={errors.weight?.message}
										slotProps={{
											input: {
												endAdornment: (
													<InputAdornment position="end">kg</InputAdornment>
												),
											},
											htmlInput: {
												min: 0.1,
												step: 0.1,
											},
										}}
									/>
								)}
							/>
						</Grid>

						{/* Dimensiones */}
						<Grid size={{ xs: 12, md: 6 }}>
							<Grid container spacing={2}>
								<Grid size={4}>
									<Controller
										name="length"
										control={control}
										render={({ field: { onChange, value } }) => (
											<TextField
												label="Largo"
												type="number"
												fullWidth
												value={value ?? ""}
												onChange={(e) =>
													onChange(
														e.target.value
															? Number.parseFloat(e.target.value)
															: undefined,
													)
												}
												error={!!errors.length}
												helperText={errors.length?.message}
												slotProps={{
													input: {
														endAdornment: (
															<InputAdornment position="end">cm</InputAdornment>
														),
													},
													htmlInput: {
														min: 1,
														step: 1,
													},
												}}
											/>
										)}
									/>
								</Grid>
								<Grid size={4}>
									<Controller
										name="width"
										control={control}
										render={({ field: { onChange, value } }) => (
											<TextField
												label="Ancho"
												type="number"
												fullWidth
												value={value ?? ""}
												onChange={(e) =>
													onChange(
														e.target.value
															? Number.parseFloat(e.target.value)
															: undefined,
													)
												}
												error={!!errors.width}
												helperText={errors.width?.message}
												slotProps={{
													input: {
														endAdornment: (
															<InputAdornment position="end">cm</InputAdornment>
														),
													},
													htmlInput: {
														min: 1,
														step: 1,
													},
												}}
											/>
										)}
									/>
								</Grid>
								<Grid size={4}>
									<Controller
										name="height"
										control={control}
										render={({ field: { onChange, value } }) => (
											<TextField
												label="Alto"
												type="number"
												fullWidth
												value={value ?? ""}
												onChange={(e) =>
													onChange(
														e.target.value
															? Number.parseFloat(e.target.value)
															: undefined,
													)
												}
												error={!!errors.height}
												helperText={errors.height?.message}
												slotProps={{
													input: {
														endAdornment: (
															<InputAdornment position="end">cm</InputAdornment>
														),
													},
													htmlInput: {
														min: 1,
														step: 1,
													},
												}}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</Grid>

						{/* Botón de envío */}
						<Grid size={12}>
							<Button
								type="submit"
								variant="contained"
								size="large"
								disabled={createQuoteMutation.isPending}
								startIcon={
									createQuoteMutation.isPending ? (
										<CircularProgress size={20} color="inherit" />
									) : (
										<CalculateIcon />
									)
								}
								sx={{ mt: 1 }}
							>
								{createQuoteMutation.isPending
									? "Calculando..."
									: "Calcular Cotización"}
							</Button>
						</Grid>
					</Grid>
				</Box>

				{/* Resultado de la cotización */}
				{quoteResult && (
					<>
						<Divider sx={{ my: 3 }} />
						<Box>
							<Typography
								variant="h6"
								fontWeight="bold"
								color="primary"
								gutterBottom
							>
								Resultado de la Cotización
							</Typography>
							<Grid container spacing={2}>
								<Grid size={{ xs: 6, md: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Peso Real
									</Typography>
									<Typography variant="body1" fontWeight="medium">
										{quoteResult.weight} kg
									</Typography>
								</Grid>
								<Grid size={{ xs: 6, md: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Peso Volumétrico
									</Typography>
									<Typography variant="body1" fontWeight="medium">
										{quoteResult.volumetricWeight} kg
									</Typography>
								</Grid>
								<Grid size={{ xs: 6, md: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Peso Cobrable
									</Typography>
									<Typography variant="body1" fontWeight="medium">
										{quoteResult.chargeableWeight} kg
									</Typography>
								</Grid>
								<Grid size={{ xs: 6, md: 3 }}>
									<Typography variant="body2" color="text.secondary">
										Precio Total
									</Typography>
									<Typography
										variant="h5"
										fontWeight="bold"
										color="primary.main"
									>
										{formatCurrency(quoteResult.totalPrice)}
									</Typography>
								</Grid>
							</Grid>
							<Typography
								variant="caption"
								color="text.secondary"
								sx={{ display: "block", mt: 2 }}
							>
								* Esta cotización es válida hasta{" "}
								{new Date(quoteResult.expiresAt).toLocaleDateString("es-CO")}
							</Typography>

							<Box sx={{ display: "flex", gap: 2, mt: 3 }}>
								<Button
									variant="outlined"
									startIcon={<HistoryIcon />}
									href="/dashboard/cotizaciones"
								>
									Ver Mis Cotizaciones
								</Button>
								<Tooltip title="Próximamente" arrow>
									<span>
										<Button
											variant="contained"
											startIcon={<AddShoppingCartIcon />}
											disabled
										>
											Crear Orden de Envío
										</Button>
									</span>
								</Tooltip>
							</Box>
						</Box>
					</>
				)}
			</CardContent>
		</Card>
	);
}
