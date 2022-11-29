export interface Notifications {
    notifications: Notification[];
    status: number;
}

export interface Notification {
    id: number;
    message: string;
    type: number;
    time: Date;
    bin_id: number;
}
