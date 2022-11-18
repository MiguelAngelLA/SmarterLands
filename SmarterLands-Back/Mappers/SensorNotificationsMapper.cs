using System.Data;

public class SensorNotificationsMapper
    {
    public static SensorReading ToObjectSensorReading(DataRow row, string[] aliases)
    {
        SensorReading sensor = new SensorReading();
        sensor.Id = Convert.ToInt(row, aliases[0]);
        sensor.Time = Convert.ToDate(row, aliases[1]);
        sensor.Temperature = Convert.ToDouble(row, aliases[2]);
        sensor.Humidity = Convert.ToDouble(row, aliases[3]);
        sensor.Moisture = Convert.ToDouble(row, aliases[4]);
        sensor.Precipitation = Convert.ToInt(row, aliases[5]);
        sensor.Bin_id = Convert.ToInt(row, aliases[6]);
        sensor.Notification_id = Convert.ToInt(row, aliases[7]);
        return sensor;
    }

    public static Notification ToObjectNotifications(DataRow row, string[] aliases)
    {
        Notification notification = new Notification();
        notification.Id = Convert.ToInt(row, aliases[0]);
        notification.Message = Convert.ToString(row, aliases[1]);
        notification.Type = Convert.ToByte(row, aliases[2]);
        return notification;
    }

    public static SensorNotfication ToList(DataTable dataTable)
    {
        SensorNotfication sl = new SensorNotfication();
        foreach (DataRow row in dataTable.Rows)
        {
            sl.SensorReadings.Add(ToObjectSensorReading(row, new string[] { "sensor_id", "time", "temperature", "humidity", "moisture", "precipitation",
            "bin_id", "notification_id" }));

            sl.Notifications.Add(ToObjectNotifications(row, new string[] { "notification_id", "message", "type" }));
        }
        return sl;
    }

}
