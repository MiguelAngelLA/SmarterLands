    public class SensorReadingPostModel
    {
        public DateTime time { get; set; }
        public double temperature { get; set; }
        public double humidity { get; set; }
        public double moisture { get; set; }
        public double precipitation { get; set; }
        public int bin_id { get; set; }
        public string notification_message { get; set; }
        public byte notification_type { get; set; }
}
