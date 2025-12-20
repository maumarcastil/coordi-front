export const queryKeys = {
	// Cities
	cities: {
		all: ["cities"] as const,
	},
	// Quotes
	quotes: {
		user: ["quotes", "user"] as const,
	},
	// Orders
	orders: {
		user: ["orders", "user"] as const,
	},
} as const;
