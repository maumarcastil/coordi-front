"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

const theme = createTheme({
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	palette: {
		primary: {
			main: "#003B95", // Azul Coordinadora aprox
		},
		secondary: {
			main: "#FFCC00", // Amarillo acento
		},
		background: {
			default: "#f4f6f8",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: "none",
				},
			},
		},
	},
});

export default theme;
