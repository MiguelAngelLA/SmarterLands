using System.Data;

public class SensorReadingMapper
{
    public static SensorReading ToObject(DataRow row, string[] aliases)
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

    public static List<SensorReading> ToList(DataTable dataTable)
    {
        List<SensorReading> list = new List<SensorReading>();
        foreach (DataRow row in dataTable.Rows)
        {
            list.Add(ToObject(row, new string[] { "id", "time", "temperature", "humidity", "moisture", "precipitation",
            "bin_id", "notification_id" }));

        }
        return list;
    }
}
