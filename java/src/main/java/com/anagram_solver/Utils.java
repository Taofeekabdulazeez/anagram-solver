package com.anagram_solver;
import java.util.HashMap;

public class Utils {
    public static HashMap<Character, Integer> getLettersFrequencyCount(String str) {
        HashMap<Character, Integer> freqMap = new HashMap<Character, Integer>();

        for (char letter : str.toCharArray()) {

            if (freqMap.containsKey(letter)) {
                int keyValue = freqMap.get(letter);
                freqMap.put(letter, ++keyValue);
            } else {
                freqMap.put(letter, 1);
            }
        }

        return freqMap;
    }
    
    public static void readAnagramFile() {
        
    }
}
