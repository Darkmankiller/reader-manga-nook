
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MangaGrid from "@/components/MangaGrid";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to MangaNook</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and enjoy a collection of amazing manga. Click on any manga to start reading!
          </p>
        </div>
        
        <MangaGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
