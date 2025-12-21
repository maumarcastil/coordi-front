import Box from "@mui/material/Box";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import MobileBottomNav from "@/features/dashboard/components/MobileBottomNav";

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
					p: { xs: 2, md: 3 },
					pb: { xs: 10, md: 3 },
					bgcolor: "background.default",
					minHeight: "100vh",
				}}
			>
				{children}
			</Box>
			<MobileBottomNav />
		</Box>
	);
}

