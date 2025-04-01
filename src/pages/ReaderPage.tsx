
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Manga } from "@/data/manga-data";
import { getMangaById, getMangaList } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReaderNavigation from "@/components/ReaderNavigation";
import { Skeleton } from "@/components/ui/skeleton";

const ReaderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevId, setPrevId] = useState<string | undefined>(undefined);
  const [nextId, setNextId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchManga = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const mangaData = await getMangaById(id);
        if (!mangaData) {
          setError("Manga not found");
          setLoading(false);
          return;
        }
        
        setManga(mangaData);
        
        // Get adjacent manga IDs for navigation
        const allMangas = await getMangaList();
        const currentIndex = allMangas.findIndex(m => m.id === id);
        
        if (currentIndex > 0) {
          setPrevId(allMangas[currentIndex - 1].id);
        }
        
        if (currentIndex < allMangas.length - 1) {
          setNextId(allMangas[currentIndex + 1].id);
        }
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load manga");
        setLoading(false);
      }
    };

    fetchManga();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="reader-container">
          {loading ? (
            <>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
              <Skeleton className="reader-image aspect-[3/4]" />
              <div className="reader-nav mt-6">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
              </div>
            </>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          ) : manga ? (
            <>
              <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
              <p className="text-muted-foreground mb-6">{manga.description}</p>
              
              <img 
                src={manga.mangaPath} 
                alt={manga.title} 
                className="reader-image"
              />
              
              <ReaderNavigation 
                currentId={manga.id} 
                prevId={prevId} 
                nextId={nextId}
              />
            </>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReaderPage;
