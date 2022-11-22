
using System.Data.SqlClient;

public class Notification
{
    public static string select = "select * from VW_GetNotifications";

    private int _id;
    private string _message;
    private DateTime _time;
    private byte _type;
    private int _bin_id;

    public int Id { get => _id; set => _id = value; }
    public string Message { get => _message; set => _message = value; }
    public byte Type { get => _type; set => _type = value; }
    public DateTime Time { get => _time; set => _time = value; }
    public int Bin_id { get => _bin_id; set => _bin_id = value; }

    public Notification(int id, string message, DateTime time, byte type, int bin_id)
    {
        Id = id;
        Message = message;
        Time = time;
        Type = type;
        Bin_id = bin_id;
    }

    public Notification()
    {
        Id = 0;
        Message = "";
        Time = new DateTime();
        Type = 0;
        Bin_id = 0;
    }

    public static List<Notification> Get(int notification_id)
    {
        SqlCommand command = new SqlCommand(select + " where bin_id = " + notification_id + " order by time");
        return NotificationMapper.ToList(SqlServerConnection.ExecuteQuery(command));
    }
}