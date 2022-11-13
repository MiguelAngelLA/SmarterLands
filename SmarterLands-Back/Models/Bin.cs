public class Bin
{
    private int _id;
    private string _name;
    private string _description;
    private DateTime _date_created;
    private int _width_dimension;
    private int _height_dimension;
    private int _crop_capacity;

    public int Id { get => _id; set => _id = value; }
    public string Name { get => _name; set => _name = value; }
    public string Description { get => _description; set => _description = value; }
    public DateTime Date_created { get => _date_created; set => _date_created = value; }
    public int Width_dimension { get => _width_dimension; set => _width_dimension = value; }
    public int Height_dimension { get => _height_dimension; set => _height_dimension = value; }
    public int Crop_capacity { get => _crop_capacity; set => _crop_capacity = value; }

    public Bin(int id, string name, string description, DateTime date_created, int width_dimension, int height_dimension, int crop_capacity)
    {
        Id = id;
        Name = name;
        Description = description;
        Date_created = date_created;
        Width_dimension = width_dimension;
        Height_dimension = height_dimension;
        Crop_capacity = crop_capacity;
    }

    public Bin()
    {
        Id = 0;
        Name = "";
        Description = "";
        Date_created = new DateTime();
        Width_dimension = 0;
        Height_dimension = 0;
        Crop_capacity = 0;
    }
}