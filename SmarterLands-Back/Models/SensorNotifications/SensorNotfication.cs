using System.Data.SqlClient;

public class SensorNotfication
{
        private static string select = "select * from VW_GetSensorReading";

        private List<SensorReading> _sensorReadings;
        private List<Notification> _notifications;

        public List<SensorReading> SensorReadings { get => _sensorReadings; set => _sensorReadings = value; }
            public List<Notification> Notifications { get => _notifications; set => _notifications = value; }

        public SensorNotfication(List<SensorReading> sensorReadings, List<Notification> notifications)
        {
            SensorReadings = sensorReadings;
            Notifications = notifications;
        }

        public SensorNotfication()
        {
            SensorReadings = new List<SensorReading>();
            Notifications = new List<Notification>();
        }

        public static SensorNotfication getSensorNotifications(int id)
        {
            SqlCommand command = new SqlCommand(select + " where bin_id = " + id + " order by [time] asc");
            return SensorNotificationsMapper.ToList(SqlServerConnection.ExecuteQuery(command));
        }
}

