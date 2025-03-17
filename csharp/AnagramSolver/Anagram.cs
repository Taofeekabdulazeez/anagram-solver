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
}

