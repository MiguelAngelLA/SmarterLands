export interface Crops {
    crops: Crop[];
    status: number;
}

export interface Crop {
    id: number;
    name: string;
    photo: string;
    description: string;
    optimal_moisture: number;
    optimal_temperature: number;
}
