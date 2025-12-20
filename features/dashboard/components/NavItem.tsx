"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

interface NavItemProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	collapsed: boolean;
}

export default function NavItem({ href, icon, label, collapsed }: NavItemProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<ListItem disablePadding sx={{ display: "block" }}>
			<Tooltip title={collapsed ? label : ""} placement="right" arrow>
				<ListItemButton
					component={Link}
					href={href}
					sx={{
						minHeight: 48,
						justifyContent: collapsed ? "center" : "initial",
						px: 2.5,
						mx: 1,
						borderRadius: 2,
						mb: 0.5,
						backgroundColor: isActive ? "secondary.main" : "transparent",
						color: isActive ? "primary.main" : "white",
						"&:hover": {
							backgroundColor: isActive ? "secondary.main" : "rgba(255, 255, 255, 0.1)",
						},
						transition: "all 0.2s ease-in-out",
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: collapsed ? 0 : 2,
							justifyContent: "center",
							color: isActive ? "primary.main" : "white",
							transition: "margin 0.2s ease-in-out",
						}}
					>
						{icon}
					</ListItemIcon>
					<ListItemText
						primary={label}
						sx={{
							opacity: collapsed ? 0 : 1,
							transition: "opacity 0.2s ease-in-out",
							"& .MuiTypography-root": {
								fontWeight: isActive ? 600 : 400,
							},
						}}
					/>
				</ListItemButton>
			</Tooltip>
		</ListItem>
	);
}

