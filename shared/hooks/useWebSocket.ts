"use client";

import { useEffect, useRef, useCallback, useState } from "react";

import { useAppSelector } from "@/shared/store/hooks";
import { WS_URL } from "@/shared/config/env";

const RECONNECT_DELAY = 3000;
const PING_INTERVAL = 30000;

export interface UseWebSocketOptions {
	/** Ruta del WebSocket (ej: "/ws/orders") */
	path: string;
	/** Callback cuando llega un mensaje */
	onMessage?: (data: unknown) => void;
	/** Callback cuando se conecta */
	onConnect?: () => void;
	/** Callback cuando se desconecta */
	onDisconnect?: () => void;
	/** Habilitar/deshabilitar la conexión (default: true) */
	enabled?: boolean;
}

export interface UseWebSocketReturn {
	/** Estado de conexión */
	isConnected: boolean;
	/** Enviar un mensaje al servidor */
	send: (data: unknown) => void;
}

export function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn {
	const { path, onMessage, onConnect, onDisconnect, enabled = true } = options;

	const accessToken = useAppSelector(
		(state) => state.auth.session?.accessToken,
	);

	const [isConnected, setIsConnected] = useState(false);
	const wsRef = useRef<WebSocket | null>(null);
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isConnectingRef = useRef(false);

	// Refs para callbacks para evitar recrear connect
	const onMessageRef = useRef(onMessage);
	const onConnectRef = useRef(onConnect);
	const onDisconnectRef = useRef(onDisconnect);

	// Actualizar refs cuando cambien los callbacks
	useEffect(() => {
		onMessageRef.current = onMessage;
	}, [onMessage]);

	useEffect(() => {
		onConnectRef.current = onConnect;
	}, [onConnect]);

	useEffect(() => {
		onDisconnectRef.current = onDisconnect;
	}, [onDisconnect]);

	const handleMessage = useCallback((event: MessageEvent) => {
		try {
			const data = JSON.parse(event.data);
			onMessageRef.current?.(data);
		} catch {
			// Ignorar mensajes malformados
		}
	}, []);

	const connect = useCallback(() => {
		if (!accessToken || isConnectingRef.current || !enabled) {
			return;
		}

		// Cerrar conexión existente si hay una
		if (wsRef.current) {
			wsRef.current.close();
			wsRef.current = null;
		}

		isConnectingRef.current = true;

		const wsUrl = `${WS_URL}${path}?token=${accessToken}`;
		const ws = new WebSocket(wsUrl);

		ws.onopen = () => {
			isConnectingRef.current = false;
			setIsConnected(true);
			onConnectRef.current?.();
		};

		ws.onmessage = handleMessage;

		ws.onclose = () => {
			isConnectingRef.current = false;
			wsRef.current = null;
			setIsConnected(false);
			onDisconnectRef.current?.();

			// Intentar reconectar después del delay
			if (accessToken && enabled) {
				reconnectTimeoutRef.current = setTimeout(() => {
					connect();
				}, RECONNECT_DELAY);
			}
		};

		ws.onerror = () => {
			isConnectingRef.current = false;
		};

		wsRef.current = ws;
	}, [accessToken, path, enabled, handleMessage]);

	// Función para enviar mensajes
	const send = useCallback((data: unknown) => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			wsRef.current.send(JSON.stringify(data));
		}
	}, []);

	// Conectar cuando hay token y está habilitado
	useEffect(() => {
		if (accessToken && enabled) {
			connect();
		}

		return () => {
			// Limpiar timeout de reconexión
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
				reconnectTimeoutRef.current = null;
			}

			// Cerrar WebSocket
			if (wsRef.current) {
				wsRef.current.close();
				wsRef.current = null;
			}
		};
	}, [accessToken, enabled, connect]);

	// Enviar ping periódico para mantener la conexión viva
	useEffect(() => {
		const pingInterval = setInterval(() => {
			if (wsRef.current?.readyState === WebSocket.OPEN) {
				wsRef.current.send(JSON.stringify({ event: "ping" }));
			}
		}, PING_INTERVAL);

		return () => clearInterval(pingInterval);
	}, []);

	return { isConnected, send };
}
