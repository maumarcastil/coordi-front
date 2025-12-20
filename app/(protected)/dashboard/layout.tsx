import Box from "@mui/material/Box";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<DashboardSidebar />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					bgcolor: "background.default",
					minHeight: "100vh",
				}}
			>
				{children}
			</Box>
		</Box>
	);
}

