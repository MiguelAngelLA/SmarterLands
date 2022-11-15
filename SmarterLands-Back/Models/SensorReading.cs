using System.Data.SqlClient;
public class SensorReading
{
	private int _id;
	private DateTime _time;
	private float _temperature;
	private float _humidity;
	private float _moisture;
	private int _precipitation;
	private int _bin_id;
	private int _notification_id;

    public int Id { get => _id; set => _id = value; }
    public DateTime Time { get => _time; set => _time = value; }
    public float Temperature { get => _temperature; set => _temperature = value; }
    public float Humidity { get => _humidity; set => _humidity = value; }
    public float Moisture { get => _moisture; set => _moisture = value; }
    public int Precipitation { get => _precipitation; set => _precipitation = value; }
    public int Bin_id { get => _bin_id; set => _bin_id = value; }
    public int Notification_id { get => _notification_id; set => _notification_id = value; }

    public SensorReading(int id, DateTime time, float temperature, float humidity, float moisture, int precipitation, int bin_id, int notification_id)
    {
        Id = id;
        Time = time;
        Temperature = temperature;
        Humidity = humidity;
        Moisture = moisture;
        Precipitation = precipitation;
        Bin_id = bin_id;
        Notification_id = notification_id;
    }

    public SensorReading()
    {
        Id = 0;
        Time = new DateTime();
        Temperature = 0.0f;
        Humidity = 0.0f;
        Moisture = 0.0f;
        Precipitation = 0;
        Bin_id = 0;
        Notification_id = 0;
    }
    public static int Post(DateTime time , double temperature, double humidity, double moisture, 
        double precipitation, int bin_id, string notification_message, byte notification_type)
    {
        string statement = "SP_AddSensorReading";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@time", time);
        command.Parameters.AddWithValue("@temperature", temperature);
        command.Parameters.AddWithValue("@humidity", humidity);
        command.Parameters.AddWithValue("@moisture", moisture);
        command.Parameters.AddWithValue("@precipitation", precipitation);
        command.Parameters.AddWithValue("@bin_id", bin_id);
        command.Parameters.AddWithValue("@notification_message", notification_message);
        command.Parameters.AddWithValue("@notification_type", notification_type);
        return SqlServerConnection.ExecuteProcedure(command);
    }

}