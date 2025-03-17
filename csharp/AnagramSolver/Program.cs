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
