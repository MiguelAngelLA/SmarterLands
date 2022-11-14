
using System.Data;

public class BinMapper
    {
        public static Bin ToObject(DataRow row, string[] aliases)
        {
            Bin bin = new Bin();
            bin.Id = Convert.ToInt(row, aliases[0]);
            bin.Name = Convert.ToString(row, aliases[1]);
            bin.Description = Convert.ToString(row, aliases[2]);
            bin.Date_created = Convert.ToDate(row, aliases[3]);
            bin.Width_dimension = Convert.ToInt(row, aliases[4]);
            bin.Height_dimension = Convert.ToInt(row, aliases[5]);
            bin.Total_capacity = Convert.ToInt(row, aliases[6]);
            bin.Remaining_capacity = Convert.ToInt(row, aliases[7]);
            return bin;
        }

        public static List<Bin> ToList(DataTable dataTable)
        {
            List<Bin> list = new List<Bin>();
            foreach (DataRow row in dataTable.Rows)
            {
                list.Add(ToObject(row, new string[] { "id", "name", "description", "date_created", "width_dimension", "height_dimension", "total_capacity", "remaining_capacity" }));
            }
            return list;
        }
}

