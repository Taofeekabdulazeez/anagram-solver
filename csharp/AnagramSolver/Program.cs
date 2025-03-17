using AnagramSolver;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowAll");


app.MapGet("/", () => "Welcome to Anagram Solver API");

app.MapGet("/anagrams/{word}", (string word, string? length) =>
{
    Console.WriteLine(length);
    List<string> anagrams = Anagram.FindAllAnagrams(word);


    return new
    {
        Word = word,
        Results = anagrams.Count,
        Data = anagrams
    };
});


app.Run();
