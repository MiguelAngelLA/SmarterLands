using System.Data.SqlClient;

public class Crop
{
    private static string select = "VW_GetAllCrops";

    private int _id;
	private string _name;
    private string _photo;
    private string _description;
	private float _optimal_moisture;
	private float _optimal_temperature;

    public int Id { get => _id; set => _id = value; }
    public string Name { get => _name; set => _name = value; }
    public string Photo { get => _photo; set => _photo = value; }
    public string Description { get => _description; set => _description = value; }
    public float Optimal_moisture { get => _optimal_moisture; set => _optimal_moisture = value; }
    public float Optimal_temperature { get => _optimal_temperature; set => _optimal_temperature = value; }

    public Crop(int id, string name, string photo, string description, float optimal_moisture, float optimal_temperature)
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
        Optimal_moisture = 0.0f;
        Optimal_temperature = 0.0f;
    }
    public static List<Crop> GetAll()
    {
        SqlCommand command = new SqlCommand(select + " order by [name] asc");
        return CropMapper.ToList(SqlServerConnection.ExecuteQuery(command));
    }

    public static int Post(string name, string description, string photo, float optimal_moisture, float optimal_temperature)
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

}
