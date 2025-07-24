using Microsoft.AspNetCore.Mvc;

using AnagramSolver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapGet("/", () => "Welcome to Anagram Solver API");

app.MapGet("/anagrams/{word}", (string word, [FromQuery] string extras) =>
{

    var phrase = word;
    var extraLetters = extras
        .Split(',', StringSplitOptions.RemoveEmptyEntries)
        .Where(s => s.Length == 1)
        .Select(s => s[0])
        .ToList();

    List<string> anagrams = Anagram.FindAllAnagrams(word + string.Concat(extraLetters));

    var (possibleWordsWithExtraLetters, possibleWords) = Anagram.FilterWordsByLetters(anagrams, extraLetters);

    return new
    {
        Phrase = phrase,
        ExtraLetters = extraLetters,
        NumberOfPossibleWords = possibleWords.Count,
        NumberOfPossibleWordsWithExtraLetters = possibleWordsWithExtraLetters.Count,
        TotalNumberOfPossibleWords = anagrams.Count,
        PossibleWords = Anagram.Serialize(possibleWords),
        PossibleWordsWithExtraLetters = Anagram.Serialize(possibleWordsWithExtraLetters),
    };
});


app.Run();
