
import { Manga } from "@/data/manga-data";
import { Link } from "react-router-dom";

interface MangaCardProps {
  manga: Manga;
}

const MangaCard = ({ manga }: MangaCardProps) => {
  return (
    <Link to={`/reader/${manga.id}`} className="manga-card block">
      <img 
        src={manga.thumbnailPath} 
        alt={manga.title} 
        className="manga-card-img"
      />
      <div className="manga-title">
        <h3 className="text-white font-medium">{manga.title}</h3>
      </div>
    </Link>
  );
};

export default MangaCard;
