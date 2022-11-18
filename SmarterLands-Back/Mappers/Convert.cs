using System.Data;

public class Convert
{
    public static string ToString(DataRow row, string fieldName)
    {
        string value = "";
        if (row[fieldName] != DBNull.Value)
        {
            return (string)row[fieldName];
        }
        return value;
    }

    public static int ToInt(DataRow row, string fieldName)
    {
        int value = 0;
        if (row[fieldName] != DBNull.Value)
        {
            return (int)row[fieldName];
        }
        return value;
    }

    public static DateTime ToDate(DataRow row, string fieldName)
    {
        DateTime value = new DateTime();
        if (row[fieldName] != DBNull.Value)
        {
            return (DateTime)row[fieldName];
        }
        return value;
    }

    public static TimeSpan ToTime(DataRow row, string fieldName)
    {
        TimeSpan value = new TimeSpan();
        if (row[fieldName] != DBNull.Value)
        {
            return (TimeSpan)row[fieldName];
        }
        return value;
    }

    public static bool ToBoolean(DataRow row, string fieldName)
    {
        bool value = false;
        if (row[fieldName] != DBNull.Value)
        {
            return (bool)row[fieldName];
        }
        return value;
    }

    public static float ToFloat(DataRow row, string fieldName)
    {
        float value = 0.0f;
        if (row[fieldName] != DBNull.Value)
        {
            return (float)row[fieldName];
        }
        return value;
    }

    public static double ToDouble(DataRow row, string fieldName)
    {
        double value = 0.0;
        if (row[fieldName] != DBNull.Value)
        {
            return (double)row[fieldName];
        }
        return value;
    }
    public static byte ToByte(DataRow row, string fieldName)
    {
        byte value = 0;
        if (row[fieldName] != DBNull.Value)
        {
            return (byte)row[fieldName];
        }
        return value;
    }
}

