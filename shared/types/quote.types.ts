export interface City {
	id: number;
	name: string;
	department: string;
	code: string;
}

export interface CitiesResponse {
	cities: City[];
}

export interface QuoteRequest {
	originCityId: number;
	destinationCityId: number;
	weight: number;
	length: number;
	width: number;
	height: number;
}

export interface Quote {
	id: number;
	originCityId: number;
	destinationCityId: number;
	weight: number;
	length: number;
	width: number;
	height: number;
	volumetricWeight: number;
	chargeableWeight: number;
	totalPrice: number;
	status: string;
	expiresAt: string;
	createdAt: string;
}

export interface QuoteResponse {
	quote: Quote;
}

