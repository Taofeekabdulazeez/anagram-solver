namespace AnagramSolver;

public class Anagram
{
    private static Dictionary<char, int> GetLettersFrequency(string word)
    {
        Dictionary<char, int> freq = [];

        foreach (char letter in word)
        {
            if (!freq.ContainsKey(letter))
                freq.Add(letter, 1);
            else
                freq[letter] = freq[letter] + 1;
        }

        return freq;
    }

    public static bool IsValidAnagram(string word, string str)
    {
        if (string.IsNullOrEmpty(word) || string.IsNullOrEmpty(str)) return false;
        if (str.Length > word.Length) return false;

        Dictionary<char, int> wordFreq = GetLettersFrequency(word);
        Dictionary<char, int> strFreq = GetLettersFrequency(str);

        foreach (KeyValuePair<char, int> s in strFreq)
        {
            if (!wordFreq.ContainsKey(s.Key) || s.Value > wordFreq[s.Key])
                return false;
        }

        return true;
    }

    private static string SortWordLetters(string word)
    {
        string sortedLetters = new([.. word.OrderBy(c => c)]);

        return sortedLetters;
    }

    private static string GetUniqueLetters(string word)
    {
        return word;
    }

    public static List<string> FindAllAnagrams(string word)
    {
        List<string> anagrams = [];

        foreach (char letter in SortWordLetters(word))
        {
            List<string>? words = AnagramFileReader.ReadJsonWordsArray(letter);

            if (words is null) continue;

            foreach (string str in words)
            {
                if (IsValidAnagram(word, str))
                    anagrams.Add(str);
            }

        }

        return anagrams;
    }

    public static Dictionary<string, bool> Serialize(List<string> wordList)
    {
        var words = new Dictionary<string, bool>();

        foreach (var item in wordList)
        {
            words[item] = true;
        }
        return words;
    }

    public static (List<string> Matches, List<string> NonMatches) FilterWordsByLetters(
      List<string> words, List<char> requiredLetters)
    {
        var matches = new List<string>();
        var nonMatches = new List<string>();

        foreach (var word in words)
        {
            if (requiredLetters.All(letter => word.Contains(letter)))
            {
                Console.WriteLine("First Edge case executed");
                matches.Add(word);
            }
            else
            {
                nonMatches.Add(word);
            }
        }

        return (matches, nonMatches);
    }
}

