using System.Text.Json;

namespace AnagramSolver;

public class AnagramFileReader
{

    public static List<string>? ReadJsonWordsArray(char letter)
    {
        string filePath = $"words/{letter}.json";
        string json = File.ReadAllText(filePath);

        var words = JsonSerializer.Deserialize<List<string>>(json);

        return words;

    }

    public static void LogList(List<string>? list)
    {
        if (list is null) return;

        foreach (string s in list)
        {
            Console.WriteLine(s);
        }
    }

}