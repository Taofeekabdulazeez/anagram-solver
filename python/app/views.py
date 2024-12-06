from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main import find_anagrams
from anagram_solver.settings import anagram_map,\
    sub_word_map, canonical_map

#TODO: Add fallback logic to find subword of non dictionary words

class AnagramView(APIView):
    def get(self, request, word):
        word_anagrams = find_anagrams(
            word,
            anagram_map,
            sub_word_map,
            canonical_map
        )

        data = {
            "anagram_length": len(word_anagrams),
            "anagrams": word_anagrams
        }
        return Response(data, status=status.HTTP_200_OK)
