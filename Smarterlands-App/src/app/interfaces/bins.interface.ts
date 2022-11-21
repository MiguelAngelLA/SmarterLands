export interface Bins {
    bins: Bin[];
    status: number;
}

export interface Bin {
    id: number;
    name: string;
    description: string;
    date_created: Date;
    width_dimension: number;
    height_dimension: number;
    total_capacity: number;
    remaining_capacity: number;
}
