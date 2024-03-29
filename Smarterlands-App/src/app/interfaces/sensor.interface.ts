export interface SensorResponse {
    sensorReadings: SensorReading[];
    status: number;
}

export interface SensorReading {
    id: number;
    time: any;
    temperature: number;
    humidity: number;
    moisture: number;
    precipitation: number;
    bin_id: number;
    notification_id: number;
    notification_type?: number
}







