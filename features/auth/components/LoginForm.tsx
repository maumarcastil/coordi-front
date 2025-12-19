"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { loginSchema } from "@/features/auth/schemas/login.schema";
import { loginUser } from "@/features/auth/services/auth.service";
import type { LoginFormData } from "@/features/auth/types/auth.types";

export default function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		setError(null);

		try {
			await loginUser(data);
			router.push("/dashboard");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error al iniciar sesión");
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				bgcolor: "background.default",
				py: 4,
			}}
		>
			<Container maxWidth="sm">
				<Card sx={{ boxShadow: 3 }}>
					<CardContent sx={{ p: 4 }}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								mb: 3,
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									color: "primary.main",
									mb: 2,
								}}
							>
								<LocalShippingIcon sx={{ fontSize: 40, mr: 1 }} />
								<Typography variant="h4" fontWeight="bold">
									COORDI
								</Typography>
							</Box>
							<Typography variant="h5" fontWeight="bold" gutterBottom>
								Iniciar Sesión
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Ingresa tus credenciales para continuar
							</Typography>
						</Box>

						{error && (
							<Alert severity="error" sx={{ mb: 3 }}>
								{error}
							</Alert>
						)}

						<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
							<TextField
								{...register("email")}
								label="Correo electrónico"
								type="email"
								fullWidth
								margin="normal"
								error={!!errors.email}
								helperText={errors.email?.message}
								autoComplete="email"
							/>

							<TextField
								{...register("password")}
								label="Contraseña"
								type="password"
								fullWidth
								margin="normal"
								error={!!errors.password}
								helperText={errors.password?.message}
								autoComplete="current-password"
							/>

							<Button
								type="submit"
								variant="contained"
								fullWidth
								size="large"
								disabled={isSubmitting}
								sx={{ mt: 3, mb: 2, py: 1.5 }}
							>
								{isSubmitting ? (
									<CircularProgress size={24} color="inherit" />
								) : (
									"Ingresar"
								)}
							</Button>

							<Box sx={{ textAlign: "center" }}>
								<Typography variant="body2" color="text.secondary">
									¿No tienes una cuenta?{" "}
									<Link href="/register" underline="hover" fontWeight="medium">
										Regístrate
									</Link>
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Container>
		</Box>
	);
}
