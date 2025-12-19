"use client";

import Link from "next/link";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Typography, Container } from "@mui/material";

export default function NotFound() {
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
					gap: 2,
				}}
			>
				<ErrorOutlineIcon sx={{ fontSize: 100, color: "text.secondary" }} />
				<Typography component="h1" variant="h2">
					404
				</Typography>
				<Typography variant="h5" color="text.secondary">
					Página no encontrada
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Lo sentimos, la ruta que intentas visitar no existe.
				</Typography>
				<Button variant="contained" component={Link} href="/" sx={{ mt: 3 }}>
					Volver al inicio
				</Button>
			</Box>
		</Container>
	);
}
