
using System.Data;

public class CropMapper
    {
        public static Crop ToObject(DataRow row, string[] aliases)
        {
            Crop crop = new Crop();
            crop.Id = Convert.ToInt(row, aliases[0]);
            crop.Name = Convert.ToString(row, aliases[1]);
            crop.Photo = Convert.ToString(row, aliases[2]);
            crop.Description = Convert.ToString(row, aliases[3]);
            crop.Optimal_moisture = Convert.ToFloat(row, aliases[4]);
            crop.Optimal_temperature = Convert.ToFloat(row, aliases[4]);
        return crop;
        }

        public static List<Crop> ToList(DataTable dataTable)
        {
            List<Crop> list = new List<Crop>();
            foreach (DataRow row in dataTable.Rows)
            {
                list.Add(ToObject(row, new string[] { "id", "name", "photo", "description", "optimal_moisture", "optimal_temperature" }));
            }
            return list;
        }
}

