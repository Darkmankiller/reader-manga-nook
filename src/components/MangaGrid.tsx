
import { useEffect, useState } from "react";
import MangaCard from "./MangaCard";
import { Manga } from "@/data/manga-data";
import { getMangaList } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const MangaGrid = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await getMangaList();
        setMangas(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load manga list");
        setLoading(false);
      }
    };

    fetchMangas();
    
    // Add an event listener for when a new manga is uploaded
    window.addEventListener("mangaUploaded", fetchMangas);
    
    return () => {
      window.removeEventListener("mangaUploaded", fetchMangas);
    };
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="manga-grid">
      {loading
        ? Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="manga-card">
                <Skeleton className="manga-card-img" />
                <div className="manga-title">
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            ))
        : mangas.map((manga) => <MangaCard key={manga.id} manga={manga} />)}
    </div>
  );
};

export default MangaGrid;
