using AnagramSolver;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/anagrams/{word}", (string word) =>
{
    List<string> anagrams = Anagram.FindAllAnagrams(word);

    return new
    {
        Word = word,
        Results = anagrams.Count,
        Data = anagrams
    };
});

app.Run();
