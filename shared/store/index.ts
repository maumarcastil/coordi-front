import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		// Aquí se agregarán los slices de cada feature
		// Ejemplo: shipments: shipmentsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// Tipos inferidos del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
