package com.anagram_solver;
import java.util.HashMap;
import java.util.Map;

import com.anagram_solver.utils.Util;

public class Anagram {
    public static boolean isValidAnagram(String word, String str) {
        if (word.length() < str.length())
            return false;
            
        HashMap<Character, Integer> wordFreqCount = Util.getLettersFrequencyCount(word);
        HashMap<Character, Integer> strFreqCount = Util.getLettersFrequencyCount(str);

        for (Map.Entry<Character, Integer> letter : strFreqCount.entrySet()) {
            char key = letter.getKey();
            int value = letter.getValue();

            if (!wordFreqCount.containsKey(key) || wordFreqCount.get(key) < value)
                return false;
        }
        return true;
    }
}
