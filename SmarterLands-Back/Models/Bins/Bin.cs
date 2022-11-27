using System.Data.SqlClient;

public class Bin
{
    private static string select = "select * from VW_GetAllBins";

    private int _id;
    private string _name;
    private string _description;
    private DateTime _date_created;
    private int _width_dimension;
    private int _height_dimension;
    private int _total_capacity;
    private int _remaining_capacity;

    public int Id { get => _id; set => _id = value; }
    public string Name { get => _name; set => _name = value; }
    public string Description { get => _description; set => _description = value; }
    public DateTime Date_created { get => _date_created; set => _date_created = value; }
    public int Width_dimension { get => _width_dimension; set => _width_dimension = value; }
    public int Height_dimension { get => _height_dimension; set => _height_dimension = value; }
    public int Total_capacity { get => _total_capacity; set => _total_capacity = value; }
    public int Remaining_capacity { get => _remaining_capacity; set => _remaining_capacity = value; }

    public Bin(int id, string name, string description, DateTime date_created, int width_dimension, int height_dimension, int total_capacity, int remaining_capacity)
    {
        Id = id;
        Name = name;
        Description = description;
        Date_created = date_created;
        Width_dimension = width_dimension;
        Height_dimension = height_dimension;
        Total_capacity = total_capacity;
        Remaining_capacity = remaining_capacity;
    }

    public Bin()
    {
        Id = 0;
        Name = "";
        Description = "";
        Date_created = new DateTime();
        Width_dimension = 0;
        Height_dimension = 0;
        Total_capacity = 0;
        Remaining_capacity = 0;
    }
    public static List<Bin> GetAll()
    {
        SqlCommand command = new SqlCommand(select + " order by [date_created] asc");
        return BinMapper.ToList(SqlServerConnection.ExecuteQuery(command));
    }
    public static Bin GetOne(int id)
    {
        SqlCommand command = new SqlCommand(select + " where id = " + id);
        return BinMapper.ToSingleObject(SqlServerConnection.ExecuteQuery(command));
    }

    public static int Post(string name, string description, int width_dimension, int height_dimension)
    {
        string statement = "SP_PostBin";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@name", name);
        command.Parameters.AddWithValue("@description", description);
        command.Parameters.AddWithValue("@width", width_dimension);
        command.Parameters.AddWithValue("@height", height_dimension);
        return SqlServerConnection.ExecuteProcedure(command);
    }

    public static int Put(int? id, string name, string description, int width_dimension, int height_dimension)
    {
        string statement = "SP_PutBin";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@id", id);
        command.Parameters.AddWithValue("@name", name);
        command.Parameters.AddWithValue("@description", description);
        command.Parameters.AddWithValue("@width", width_dimension);
        command.Parameters.AddWithValue("@height", height_dimension);
        return SqlServerConnection.ExecuteProcedure(command);
    }

    public static int Del(int id)
    {
        string statement = "SP_DelBin";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@id", id);
        return SqlServerConnection.ExecuteProcedure(command);
    }

    public static int AddCrop(int bin_id, int crop_id, int quantity)
    {
        string statement = "SP_BinAddCrop";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@bin_id", bin_id);
        command.Parameters.AddWithValue("@crop_id", crop_id);
        command.Parameters.AddWithValue("@quantity", quantity);
        return SqlServerConnection.ExecuteProcedure(command);
    }
    public static int RemoveCrop(int bin_id, int crop_id, int quantity)
    {
        string statement = "SP_BinRemoveCrop";
        SqlCommand command = new SqlCommand(statement);
        command.Parameters.AddWithValue("@bin_id", bin_id);
        command.Parameters.AddWithValue("@crop_id", crop_id);
        command.Parameters.AddWithValue("@quantity", quantity);
        return SqlServerConnection.ExecuteProcedure(command);
    }

}