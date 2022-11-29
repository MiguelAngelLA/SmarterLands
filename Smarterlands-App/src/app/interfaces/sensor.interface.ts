export interface SensorResponse {
    sensorReadings: SensorReading[];
    status: number;
}

export interface SensorReading {
    id: number;
    time: Date;
    temperature: number;
    humidity: number;
    moisture: number;
    precipitation: number;
    bin_id: number;
    notification_id: number;
}

export interface SensorNotfication {
    sensorReadings: SensorReading[];
    notifications: Notification[];
}




