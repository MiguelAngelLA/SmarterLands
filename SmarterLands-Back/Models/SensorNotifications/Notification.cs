
public class Notification
{
    private int _id;
    private string _message;
    private byte _type;

    public int Id { get => _id; set => _id = value; }
    public string Message { get => _message; set => _message = value; }
    public byte Type { get => _type; set => _type = value; }

    public Notification(int id, string message, byte type)
    {
        Id = id;
        Message = message;
        Type = type;
    }

    public Notification()
    {
        Id = 0;
        Message = "";
        Type = 0;
    }
}