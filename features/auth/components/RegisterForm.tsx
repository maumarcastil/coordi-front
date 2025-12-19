"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
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

import { registerUser } from "@/shared/services/auth.service";
import type { RegisterFormData } from "@/shared/types/auth.types";

import { registerSchema } from "@/features/auth/schemas/register.schema";

export default function RegisterForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		setError(null);

		try {
			const { confirmPassword: _, ...registerData } = data;
			await registerUser(registerData);

			// Auto-login después de registro exitoso
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				// Si falla el auto-login, redirigir a login
				router.push("/login");
				return;
			}

			router.push("/dashboard");
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error al registrar");
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
								Crear Cuenta
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Completa el formulario para registrarte
							</Typography>
						</Box>

						{error && (
							<Alert severity="error" sx={{ mb: 3 }}>
								{error}
							</Alert>
						)}

						<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
							<TextField
								{...register("name")}
								label="Nombre completo"
								fullWidth
								margin="normal"
								error={!!errors.name}
								helperText={errors.name?.message}
								autoComplete="name"
							/>

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
								autoComplete="new-password"
							/>

							<TextField
								{...register("confirmPassword")}
								label="Confirmar contraseña"
								type="password"
								fullWidth
								margin="normal"
								error={!!errors.confirmPassword}
								helperText={errors.confirmPassword?.message}
								autoComplete="new-password"
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
									"Registrarse"
								)}
							</Button>

							<Box sx={{ textAlign: "center" }}>
								<Typography variant="body2" color="text.secondary">
									¿Ya tienes una cuenta?{" "}
									<Link href="/login" underline="hover" fontWeight="medium">
										Inicia sesión
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
