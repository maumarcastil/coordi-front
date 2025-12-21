"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";

import NavItem from "./NavItem";

const DRAWER_WIDTH = 260;
const DRAWER_WIDTH_COLLAPSED = 72;

const navigationItems = [
	{
		href: "/dashboard",
		icon: <DashboardIcon />,
		label: "Dashboard",
	},
	{
		href: "/dashboard/cotizaciones",
		icon: <RequestQuoteIcon />,
		label: "Cotizaciones",
	},
	{
		href: "/dashboard/ordenes",
		icon: <LocalShippingIcon />,
		label: "Órdenes de Envío",
	},
];

export default function DashboardSidebar() {
	const [collapsed, setCollapsed] = useState(false);
	const { data: session } = useSession();

	const handleLogout = () => {
		signOut({ callbackUrl: "/login" });
	};

	const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				transition: "width 0.2s ease-in-out",
				display: { xs: "none", md: "block" },
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					backgroundColor: "primary.main",
					color: "white",
					borderRight: "none",
					transition: "width 0.2s ease-in-out",
					overflowX: "hidden",
					display: { xs: "none", md: "flex" },
					flexDirection: "column",
				},
			}}
		>
			{/* Header con logo */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: collapsed ? "center" : "space-between",
					p: 2,
					minHeight: 64,
				}}
			>
				{!collapsed && (
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<LocalShippingIcon sx={{ fontSize: 32 }} />
						<Typography variant="h5" fontWeight="bold">
							COORDI
						</Typography>
					</Box>
				)}
				{collapsed && <LocalShippingIcon sx={{ fontSize: 28 }} />}
				<IconButton
					onClick={() => setCollapsed(!collapsed)}
					sx={{
						color: "white",
						"&:hover": {
							backgroundColor: "rgba(255, 255, 255, 0.1)",
						},
						...(collapsed && {
							position: "absolute",
							right: 8,
							top: 16,
						}),
					}}
				>
					{collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</Box>

			<Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />

			{/* Navigation items */}
			<List sx={{ flex: 1, py: 2 }}>
				{navigationItems.map((item) => (
					<NavItem
						key={item.href}
						href={item.href}
						icon={item.icon}
						label={item.label}
						collapsed={collapsed}
					/>
				))}
			</List>

			<Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />

			{/* User info y logout */}
			<Box sx={{ p: 2 }}>
				{!collapsed ? (
					<>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1.5,
								mb: 2,
								px: 1,
							}}
						>
							<Avatar
								sx={{
									width: 36,
									height: 36,
									bgcolor: "secondary.main",
									color: "primary.main",
									fontWeight: "bold",
								}}
							>
								{session?.user?.name?.[0]?.toUpperCase() || "U"}
							</Avatar>
							<Box sx={{ overflow: "hidden" }}>
								<Typography
									variant="body2"
									fontWeight="medium"
									noWrap
									sx={{ maxWidth: 150 }}
								>
									{session?.user?.name || "Usuario"}
								</Typography>
								<Typography
									variant="caption"
									sx={{ color: "rgba(255, 255, 255, 0.7)" }}
									noWrap
								>
									{session?.user?.email || ""}
								</Typography>
							</Box>
						</Box>
						<Button
							variant="outlined"
							fullWidth
							startIcon={<LogoutIcon />}
							onClick={handleLogout}
							sx={{
								color: "white",
								borderColor: "rgba(255, 255, 255, 0.5)",
								"&:hover": {
									borderColor: "white",
									backgroundColor: "rgba(255, 255, 255, 0.1)",
								},
							}}
						>
							Cerrar Sesión
						</Button>
					</>
				) : (
					<Tooltip title="Cerrar Sesión" placement="right" arrow>
						<IconButton
							onClick={handleLogout}
							sx={{
								color: "white",
								width: "100%",
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.1)",
								},
							}}
						>
							<LogoutIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		</Drawer>
	);
}

