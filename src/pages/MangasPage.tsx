
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Manga } from "@/data/manga-data";
import { getMangaList } from "@/lib/api";
import MangaCard from "@/components/MangaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MangasPage = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [filteredMangas, setFilteredMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await getMangaList();
        setMangas(data);
        setFilteredMangas(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load manga list");
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMangas(mangas);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = mangas.filter(manga => 
        manga.title.toLowerCase().includes(lowercaseQuery) || 
        manga.description.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredMangas(filtered);
    }
  }, [searchQuery, mangas]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">All Mangas</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Browse our complete collection of manga and find your next favorite read
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search by title or description..."
              className="pl-10" 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        ) : loading ? (
          <div className="manga-grid">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="manga-card">
                  <Skeleton className="manga-card-img" />
                  <div className="manga-title">
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <>
            {filteredMangas.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">No mangas found matching your search.</p>
              </div>
            ) : (
              <div className="manga-grid">
                {filteredMangas.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MangasPage;
