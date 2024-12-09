package com.anagram_solver;
import java.util.HashMap;
import java.util.Map;

public class Anagram {
    public static boolean isValidAnagram(String word, String str) {
        if (word.length() < str.length())
            return false;
            
        HashMap<Character, Integer> wordFreqCount = Utils.getLettersFrequencyCount(word);
        HashMap<Character, Integer> strFreqCount = Utils.getLettersFrequencyCount(str);

        for (Map.Entry<Character, Integer> letter : strFreqCount.entrySet()) {
            char key = letter.getKey();
            int value = letter.getValue();

            if (!wordFreqCount.containsKey(key) || wordFreqCount.get(key) < value)
                return false;
        }
        return true;
    }
}
