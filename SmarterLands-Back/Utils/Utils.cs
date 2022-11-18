    public class Utils
    {
    public static string transformPhoto(string photo) {

            try {
                string[] splitBySlash = photo.Split('/');
                return splitBySlash[5];
            }
            catch {
                return "no-photo.png";
            }
        }
    }
