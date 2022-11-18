public class PhotoMapper
{
    public static List<string> GetAllPhotos()
    {
        DirectoryInfo directoryInfo = new DirectoryInfo(Path.Combine(Directory.GetCurrentDirectory() + "\\Assets" + "\\Crops"));

        FileInfo[] Files = directoryInfo.GetFiles("*.png");
        List<string> photos= new List<string>();

        foreach (FileInfo file in Files)
        {
            photos.Add(ProjectConfig.Configuration.Root + ProjectConfig.Configuration.Files.Crops + file.Name);
        }

        return photos;
    }
}
