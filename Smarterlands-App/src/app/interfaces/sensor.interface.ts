export interface SensorNotifacionResponse {
    sensorNotfication: SensorNotfication;
    status: number;
}

export interface SensorNotfication {
    sensorReadings: SensorReading[];
    notifications: Notification[];
}

export interface Notification {
    id: number;
    message: string;
    type: number;
    time: Date;
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
