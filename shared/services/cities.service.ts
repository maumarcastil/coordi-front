import apiClient from "@/shared/lib/axios";
import type { CitiesResponse } from "@/shared/types/city.types";

export async function getCities(): Promise<CitiesResponse> {
	const response = await apiClient.get<CitiesResponse>("/cities");
	return response.data;
}

