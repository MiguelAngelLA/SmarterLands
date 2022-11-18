using System.Data.SqlClient;

public class Crop
{
    private static string select = "select * from VW_GetAllCrops";

    private int _id;
	private string _name;
    private string _photo;
    private string _description;
	private double _optimal_moisture;
	private double _optimal_temperature;

    public int Id { get => _id; set => _id = value; }
    public string Name { get => _name; set => _name = value; }
    public string Photo { get => _photo; set => _photo = ProjectConfig.Configuration.Root + ProjectConfig.Configuration.Files.Crops + value; }
    public string Description { get => _description; set => _description = value; }
    public double Optimal_moisture { get => _optimal_moisture; set => _optimal_moisture = value; }
    public double Optimal_temperature { get => _optimal_temperature; set => _optimal_temperature = value; }

    public Crop(int id, string name, string photo, string description, double optimal_moisture, double optimal_temperature)
    {
        Id = id;
        Name = name;
        Photo = photo;
        Description = description;
        Optimal_moisture = optimal_moisture;
        Optimal_temperature = optimal_temperature;
    }

    public Crop()
    {
        Id = 0;
        Name = "";
        Photo = "";
        Description = "";
        Optimal_moisture = 0.0;
        Optimal_temperature = 0.0;
    }
    public static List<Crop> GetAll()
    {
        SqlCommand command = new SqlCommand(select + " order by [name] asc");
        return CropMapper.ToList(SqlServerConnection.ExecuteQuery(command));
    }

    public static int Post(string name, string description, string? photo, double optimal_moisture, double? optimal_temperature)
    {
        string statement = "SP_PostCrop";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@name", name);
        command.Parameters.AddWithValue("@description", description);
        command.Parameters.AddWithValue("@photo", photo);
        command.Parameters.AddWithValue("@optimal_moisture", optimal_moisture);
        command.Parameters.AddWithValue("@optimal_temperature", optimal_temperature);
        return SqlServerConnection.ExecuteProcedure(command);
    }

    public static int Put(int? id, string name, string description, string? photo, double optimal_moisture, double? optimal_temperature)
    {
        string statement = "SP_PutCrop";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@id", id);
        command.Parameters.AddWithValue("@name", name);
        command.Parameters.AddWithValue("@description", description);
        command.Parameters.AddWithValue("@photo", photo);
        command.Parameters.AddWithValue("@optimal_moisture", optimal_moisture);
        command.Parameters.AddWithValue("@optimal_temperature", optimal_temperature);
        return SqlServerConnection.ExecuteProcedure(command);
    }

    public static int Del(int id)
    {
        string statement = "SP_DelCrop";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@id", id);
        return SqlServerConnection.ExecuteProcedure(command);
    }

}
