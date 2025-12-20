import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DashboardPage() {
	return (
		<Box>
			<Typography variant="h4" fontWeight="bold" gutterBottom>
				Dashboard
			</Typography>
			<Typography variant="body1" color="text.secondary">
				Bienvenido al panel de control de Coordi.
			</Typography>
		</Box>
	);
}

