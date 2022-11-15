using System.Data; //generic data
using System.Data.SqlClient;

public class SqlServerConnection
{
    #region class variables

    private static string connectionString = "Data Source=" + ProjectConfig.Configuration.SqlServer.Server + "; Initial Catalog=" + ProjectConfig.Configuration.SqlServer.Database + "; User Id=" + ProjectConfig.Configuration.SqlServer.User + "; Password=" + ProjectConfig.Configuration.SqlServer.Password + "; MultipleActiveResultSets=true;";
    #endregion

    #region class methods

    /// <summary>
    /// Execute query command
    /// </summary>
    /// <param name="command">SQL command</param>
    /// <returns></returns>
    public static DataTable ExecuteQuery(SqlCommand command)
    {
        DataTable table = new DataTable();
        SqlConnection connection = new SqlConnection(connectionString);
        try
        {
            connection.Open();
            command.Connection = connection;
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            adapter.Fill(table);
        }
        catch (SqlException ex)
        {
            AppendErrorLog(ex.Message); //debug only
        }
        catch (Exception ex)
        {
            AppendErrorLog(ex.Message); //debug only
        }
        finally
        {
            connection.Close();
            connection.Dispose();
        }
        return table;
    }

    public static DataTable ExecuteQuery(SqlCommand command, out string errorMessage)
    {
        errorMessage = "";
        DataTable table = new DataTable();
        SqlConnection connection = new SqlConnection(connectionString);
        try
        {
            connection.Open();
            command.Connection = connection;
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            adapter.Fill(table);
        }
        catch (SqlException ex)
        {
            Console.WriteLine(ex.Message); //debug only
            errorMessage = ex.Message;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message); //debug only
            errorMessage = ex.Message;
        }
        finally
        {
            connection.Close();
            connection.Dispose();
        }
        return table;
    }

    /// <summary>
    /// Execute non-query command
    /// </summary>
    /// <param name="command">SQL command</param>
    /// <returns></returns>
    public static bool ExecuteCommand(SqlCommand command)
    {
        bool executed = false;
        SqlConnection connection = new SqlConnection(connectionString);
        try
        {
            connection.Open();
            command.Connection = connection;
            command.ExecuteNonQuery();
            executed = true;
        }
        catch (SqlException ex)
        {
            AppendErrorLog(ex.Message); //debug only
        }
        catch (Exception ex)
        {
            AppendErrorLog(ex.Message); //debug only
        }
        finally
        {
            connection.Close();
            connection.Dispose();
        }

        return executed;
    }

    /// <summary>
    /// Execute stored procedure
    /// </summary>
    /// <param name="command">SQL command</param>
    /// <returns></returns>
    public static int ExecuteProcedure(SqlCommand command)
    {
        int status = 999;
        SqlConnection connection = new SqlConnection(connectionString);

        try
        {
            connection.Open();
            command.Connection = connection;
            command.CommandType = CommandType.StoredProcedure;
            SqlParameter returnParameter = new SqlParameter("@status", SqlDbType.Int);
            returnParameter.Direction = ParameterDirection.Output;
            command.Parameters.Add(returnParameter);
            command.ExecuteNonQuery();
            status = (int)returnParameter.Value;
        }
        catch (SqlException ex)
        {
            AppendErrorLog(ex.Message); //debug only
        }
        catch (Exception ex)
        {
            AppendErrorLog(ex.Message); //debug only
        }
        finally
        {
            connection.Close();
            connection.Dispose();
        }
        return status;
    }

    private static void AppendErrorLog(string message)
    {
        string folder = ProjectConfig.Configuration.Paths.Local + "\\log\\";
        if (!System.IO.Directory.Exists(folder))
        {
            System.IO.Directory.CreateDirectory(folder);
        }
        string filePath = folder + "errors.txt";
        string line = DateTime.Now.ToString() + "\t" + message + "\n";
        if (System.IO.File.Exists(filePath))
            System.IO.File.AppendAllText(filePath, line);
        else
            System.IO.File.WriteAllText(filePath, line);
    }

    #endregion
}

