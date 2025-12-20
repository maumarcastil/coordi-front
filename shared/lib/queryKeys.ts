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
		detail: (id: string) => ["orders", "detail", id] as const,
		history: (id: string) => ["orders", "history", id] as const,
	},
} as const;
