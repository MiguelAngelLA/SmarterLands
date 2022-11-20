
public class Notification
{
    private int _id;
    private string _message;
    private DateTime _time;
    private byte _type;

    public int Id { get => _id; set => _id = value; }
    public string Message { get => _message; set => _message = value; }
    public byte Type { get => _type; set => _type = value; }
    public DateTime Time { get => _time; set => _time = value; }

    public Notification(int id, string message, DateTime time, byte type)
    {
        Id = id;
        Message = message;
        Time = time;
        Type = type;
    }

    public Notification()
    {
        Id = 0;
        Message = "";
        Time = new DateTime();
        Type = 0;
    }
}