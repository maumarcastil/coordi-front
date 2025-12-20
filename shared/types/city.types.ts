export interface City {
	id: number;
	name: string;
	department: string;
	code: string;
}

export interface CitiesResponse {
	cities: City[];
}

