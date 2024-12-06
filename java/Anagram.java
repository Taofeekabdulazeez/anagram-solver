import java.util.HashMap;
import java.util.Map;

public class Anagram {
    public static boolean checkAnagram(String word, String subStr) {
        if (word.length() < subStr.length())
            return false;
            
        HashMap<Character, Integer> wordFreqCount = Utils.getLettersFrequencyCount(word);
        HashMap<Character, Integer> subStrFreqCount = Utils.getLettersFrequencyCount(subStr);

        for (Map.Entry<Character, Integer> letter : subStrFreqCount.entrySet()) {
            char key = letter.getKey();
            int value = letter.getValue();

            if (!wordFreqCount.containsKey(key) || wordFreqCount.get(key) < value)
                return false;
        }
        return true;
    }
}
