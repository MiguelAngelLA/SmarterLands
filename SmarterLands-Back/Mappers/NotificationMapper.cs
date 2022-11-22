using System.Data;

public class NotificationMapper
    {
    public static Notification ToObject(DataRow row, string[] aliases)
    {
        Notification notification = new Notification();
        notification.Id = Convert.ToInt(row, aliases[0]);
        notification.Message = Convert.ToString(row, aliases[1]);
        notification.Type = Convert.ToByte(row, aliases[2]);
        notification.Time = Convert.ToDate(row, aliases[3]);
        notification.Bin_id = Convert.ToInt(row, aliases[4]);
        return notification;
    }

    public static List<Notification> ToList(DataTable dataTable)
    {
        List<Notification> list = new List<Notification>();
        foreach (DataRow row in dataTable.Rows)
        {
            list.Add(ToObject(row, new string[] { "id", "message", "type", "time", "bin_id" }));
        }
        return list;
    }
}
