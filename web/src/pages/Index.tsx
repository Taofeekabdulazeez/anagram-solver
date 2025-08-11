import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Search, Copy, Check, ArrowUpDown, SortAsc, SortDesc } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface ApiResponse {
  word: string;
  numResults: number;
  anagrams: string[];
}

type SortKey = "alpha" | "length";

type SortDir = "asc" | "desc";

const fetchAnagrams = async (word: string): Promise<ApiResponse> => {
  const res = await fetch(`https://anagram-solver.onrender.com/${encodeURIComponent(word)}`);
  if (!res.ok) throw new Error("Failed to fetch anagrams");
  return res.json();
};

const Index = () => {
  const [query, setQuery] = useState("");
  const [activeWord, setActiveWord] = useState<string>("");
  const [lengthFilter, setLengthFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("alpha");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const { mutateAsync, data, isPending, isSuccess } = useMutation({
    mutationFn: fetchAnagrams,
    onError: (err: any) => {
      toast({
        title: "Something went wrong",
        description: err?.message ?? "Could not load anagrams.",
      });
    },
  });

  const onSearch = async (w?: string) => {
    const word = (w ?? query).trim();
    if (!word) {
      toast({ title: "Enter a word", description: "Type a word to find its anagrams." });
      return;
    }
    setActiveWord(word);
    await mutateAsync(word);
  };

  const rawList = data?.anagrams ?? [];

  const availableLengths = useMemo(() => {
    const set = new Set<number>(rawList.map((w) => w.length));
    return Array.from(set).sort((a, b) => a - b);
  }, [rawList]);

  const filteredSorted = useMemo(() => {
    let list = rawList;
    if (lengthFilter !== "all") {
      const n = Number(lengthFilter);
      list = list.filter((w) => w.length === n);
    }
    list = [...list].sort((a, b) => {
      if (sortKey === "length") {
        return sortDir === "asc" ? a.length - b.length : b.length - a.length;
      }
      // alpha
      return sortDir === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    });
    return list;
  }, [rawList, lengthFilter, sortKey, sortDir]);

  const handleCopy = async (w: string) => {
    try {
      await navigator.clipboard.writeText(w);
      toast({ title: "Copied", description: `\"${w}\" copied to clipboard.` });
    } catch {
      toast({ title: "Copy failed", description: "Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Anagram Solver | Fast Word Unscrambler</title>
        <meta name="description" content="Anagram Solver app: enter a word to discover all its anagrams with filters and sorting. Copy results or rerun searches instantly." />
        <link rel="canonical" href="/" />
      </Helmet>

      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="story-link font-semibold text-lg">
            Anagram Solver
          </a>
          <nav className="flex items-center gap-4">
            <a href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container py-10">
        <section className="mx-auto max-w-3xl animate-enter">
          <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent">
            Anagram Solver
          </h1>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Find Anagrams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a word, e.g. listen"
                    onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    aria-label="Search word"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Button onClick={() => onSearch()} disabled={isPending}>
                  {isPending ? "Searching..." : "Search"}
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Length</span>
                  <Select value={lengthFilter} onValueChange={setLengthFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {availableLengths.map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} letters
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator orientation="vertical" className="hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort</span>
                  <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Alphabetical" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alpha">Alphabetical</SelectItem>
                      <SelectItem value="length">By length</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label="Toggle sort direction"
                    onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                  >
                    {sortDir === "asc" ? (
                      sortKey === "alpha" ? <SortAsc className="h-4 w-4" /> : <ArrowUpDown className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            {isSuccess && (
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Results for <span className="font-medium">{activeWord}</span>
                </div>
                <Badge variant="secondary">{filteredSorted.length} results</Badge>
              </div>
            )}

            {filteredSorted.length > 0 ? (
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {filteredSorted.map((w) => (
                  <li key={w}>
                    <Card className="group transition-shadow duration-200 hover:shadow-md">
                      <CardContent className="flex items-center justify-between p-3">
                        <button
                          className="text-left font-medium truncate mr-2"
                          onClick={() => handleCopy(w)}
                          title="Click to copy"
                        >
                          {w}
                        </button>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSearch(w);
                              setQuery(w);
                            }}
                            aria-label={`Search anagrams for ${w}`}
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(w);
                            }}
                            aria-label={`Copy ${w}`}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            ) : isSuccess ? (
              <Card className="animate-fade-in">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Check className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium">No anagrams found</p>
                  <p className="text-sm text-muted-foreground">Try a different word or adjust filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Tip: click a result to copy it, or use the search icon to rerun the search.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-6 text-center text-xs text-muted-foreground">
          Built with ❤️ • Smooth animations, light/dark themes, and delightful details.
        </div>
      </footer>
    </div>
  );
};

export default Index;
