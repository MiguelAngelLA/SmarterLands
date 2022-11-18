using System.Data;

public class BinWithCropMapper
{
    public static BinWithCrop ToObject(DataRow row, string[] aliases)
    {
        BinWithCrop bin = new BinWithCrop();
        bin.Id = Convert.ToInt(row, aliases[0]);
        bin.Bin_id = Convert.ToInt(row, aliases[1]);
        bin.Crop_id = Convert.ToInt(row, aliases[2]);
        bin.Quantity = Convert.ToInt(row, aliases[3]);
        bin.Name = Convert.ToString(row, aliases[4]);
        bin.Photo = Convert.ToString(row, aliases[5]);
        bin.Description = Convert.ToString(row, aliases[6]);
        bin.Optimal_moisture = Convert.ToDouble(row, aliases[7]);
        bin.Optimal_temperature = Convert.ToDouble(row, aliases[8]);
        return bin;
    }

    public static List<BinWithCrop> ToList(DataTable dataTable)
    {
        List<BinWithCrop> list = new List<BinWithCrop>();
        foreach (DataRow row in dataTable.Rows)
        {
            list.Add(ToObject(row, new string[] { "id", "bin_id", "crop_id", "quantity", "name", 
                "photo", "description", "optimal_moisture", "optimal_temperature" }));
        }
        return list;
    }
}
