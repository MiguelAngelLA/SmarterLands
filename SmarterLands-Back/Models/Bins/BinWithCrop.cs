using System.Data.SqlClient;

public class BinWithCrop
{

        private static string select = "select * from VW_GetCropsOnBin";

        private int _id;
        private int _bin_id;
        private int _crop_id;
        private int _quantity;
        private string _name;
        private string _photo;
        private string _description;
        private double _optimal_moisture;
        private double _optimal_temperature;

        public int Id { get => _id; set => _id = value; }
        public int Bin_id { get => _bin_id; set => _bin_id = value; }
        public int Crop_id { get => _crop_id; set => _crop_id = value; }
        public int Quantity { get => _quantity; set => _quantity = value; }
        public string Name { get => _name; set => _name = value; }
        public string Photo { get => _photo; set => _photo = ProjectConfig.Configuration.Root + ProjectConfig.Configuration.Files.Crops + value; }
        public string Description { get => _description; set => _description = value; }
        public double Optimal_moisture { get => _optimal_moisture; set => _optimal_moisture = value; }
        public double Optimal_temperature { get => _optimal_temperature; set => _optimal_temperature = value; }

        public BinWithCrop(int id, int bin_id, int crop_id, int quantity, string name, string photo, string description, double optimal_moisture, double optimal_temperature)
        {
            Id = id;
            Bin_id = bin_id;
            Crop_id = crop_id;
            Quantity = quantity;
            Name = name;
            Photo = photo;
            Description = description;
            Optimal_moisture = optimal_moisture;
            Optimal_temperature = optimal_temperature;
        }

        public BinWithCrop()
        { 
            Id = 0;
            Bin_id = 0;
            Crop_id = 0;
            Quantity = 0;
            Name = "";
            Photo = "";
            Description = "";
            Optimal_moisture = 0.0f;
            Optimal_temperature = 0.0f;
        }

        public static List<BinWithCrop> Get(int bin_id)
        {
            SqlCommand command = new SqlCommand(select + " where bin_id = " + bin_id);
            return BinWithCropMapper.ToList(SqlServerConnection.ExecuteQuery(command));
        }
}
