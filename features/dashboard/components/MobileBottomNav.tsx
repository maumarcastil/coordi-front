"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const navigationItems = [
	{
		href: "/dashboard",
		icon: <DashboardIcon />,
		label: "Inicio",
	},
	{
		href: "/dashboard/cotizaciones",
		icon: <RequestQuoteIcon />,
		label: "Cotizaciones",
	},
	{
		href: "/dashboard/ordenes",
		icon: <LocalShippingIcon />,
		label: "Órdenes",
	},
];

export default function MobileBottomNav() {
	const pathname = usePathname();
	const router = useRouter();
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

	// Determinar el valor activo basado en la ruta actual
	const getCurrentValue = () => {
		const index = navigationItems.findIndex((item) => item.href === pathname);
		return index >= 0 ? index : 0;
	};

	const handleNavigation = (
		_event: React.SyntheticEvent,
		newValue: number,
	) => {
		if (newValue === 3) {
			// Cuenta/Logout
			setLogoutDialogOpen(true);
		} else {
			router.push(navigationItems[newValue].href);
		}
	};

	const handleLogout = () => {
		signOut({ callbackUrl: "/login" });
	};

	return (
		<>
			<Paper
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 1100,
					display: { xs: "block", md: "none" },
					borderTop: 1,
					borderColor: "divider",
				}}
				elevation={8}
			>
				<BottomNavigation
					value={getCurrentValue()}
					onChange={handleNavigation}
					showLabels
					sx={{
						height: 64,
						"& .MuiBottomNavigationAction-root": {
							minWidth: "auto",
							py: 1,
							"&.Mui-selected": {
								color: "primary.main",
							},
						},
						"& .MuiBottomNavigationAction-label": {
							fontSize: "0.7rem",
							"&.Mui-selected": {
								fontSize: "0.75rem",
								fontWeight: 600,
							},
						},
					}}
				>
					{navigationItems.map((item) => (
						<BottomNavigationAction
							key={item.href}
							label={item.label}
							icon={item.icon}
						/>
					))}
					<BottomNavigationAction
						label="Cuenta"
						icon={<AccountCircleIcon />}
					/>
				</BottomNavigation>
			</Paper>

			{/* Dialog de confirmación para cerrar sesión */}
			<Dialog
				open={logoutDialogOpen}
				onClose={() => setLogoutDialogOpen(false)}
				PaperProps={{
					sx: {
						borderRadius: 3,
						p: 1,
					},
				}}
			>
				<DialogTitle sx={{ fontWeight: "bold" }}>Cerrar Sesión</DialogTitle>
				<DialogContent>
					<Typography variant="body2" color="text.secondary">
						¿Estás seguro de que deseas cerrar tu sesión?
					</Typography>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 2 }}>
					<Button
						onClick={() => setLogoutDialogOpen(false)}
						variant="outlined"
						sx={{ borderRadius: 2 }}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleLogout}
						variant="contained"
						color="error"
						sx={{ borderRadius: 2 }}
					>
						Cerrar Sesión
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

