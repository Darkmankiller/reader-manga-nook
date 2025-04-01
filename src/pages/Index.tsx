
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MangaGrid from "@/components/MangaGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to MangaNook</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Discover and enjoy our featured manga collection. Click on any manga to start reading!
          </p>
          <Link to="/mangas">
            <Button variant="outline" className="mt-2">
              Browse All Mangas
            </Button>
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Featured Manga</h2>
        <MangaGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
