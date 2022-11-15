public class ProjectConfig
{
    public SqlServer SqlServer { get; set; }
    public string Root { get; set; }
    public Files Files { get; set; }
    public Format Format { get; set; }
    public Paths Paths { get; set; }

    public static ProjectConfig Configuration;
}


