
import { Manga } from "@/data/manga-data";
import { Link } from "react-router-dom";

interface MangaCardProps {
  manga: Manga;
}

const MangaCard = ({ manga }: MangaCardProps) => {
  return (
    <Link to={`/reader/${manga.id}`} className="manga-card block">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
        <img 
          src={manga.thumbnailPath} 
          alt={manga.title} 
          className="manga-card-img"
        />
        <div className="manga-title">
          <h3 className="text-white font-medium">{manga.title}</h3>
          <p className="text-white/80 text-sm truncate">{manga.description.substring(0, 60)}{manga.description.length > 60 ? '...' : ''}</p>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;
