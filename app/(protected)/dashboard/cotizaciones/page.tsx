import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CotizacionesPage() {
	return (
		<Box>
			<Typography variant="h4" fontWeight="bold" gutterBottom>
				Cotizaciones
			</Typography>
			<Typography variant="body1" color="text.secondary">
				Gestiona las cotizaciones de envío para tus clientes.
			</Typography>
		</Box>
	);
}

