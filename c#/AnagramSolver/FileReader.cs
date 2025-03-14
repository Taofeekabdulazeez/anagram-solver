using System.Text.Json;

namespace AnagramSolver;

public class FileReader
{

    public static List<string>? ReadJsonWordsArray(char letter)
    {
        string filePath = $"words/{letter}.json";
        string json = File.ReadAllText(filePath);

        var words = JsonSerializer.Deserialize<List<string>>(json);

        return words;

    }

    private static void LogList(List<string>? list)
    {
        if (list is null) return;

        foreach (string s in list)
        {
            Console.WriteLine(s);
        }
    }

}