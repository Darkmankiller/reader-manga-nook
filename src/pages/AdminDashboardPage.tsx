
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredToken, isAdmin, removeToken } from "@/lib/auth";
import { uploadManga } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboardPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [mangaImage, setMangaImage] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [mangaPreview, setMangaPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = getStoredToken();
    if (!isAdmin(token)) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You must be logged in as admin to view this page",
      });
      navigate("/admin-login");
    }
  }, [navigate, toast]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleMangaImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMangaImage(file);
      setMangaPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !thumbnail || !mangaImage) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "All fields are required",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("mangaImage", mangaImage);
      
      const newManga = await uploadManga(formData);
      
      if (newManga) {
        toast({
          title: "Upload successful",
          description: `"${newManga.title}" has been added`,
        });
        
        // Dispatch a custom event to notify that a new manga has been uploaded
        window.dispatchEvent(new CustomEvent("mangaUploaded"));
        
        // Reset form
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setMangaImage(null);
        setThumbnailPreview(null);
        setMangaPreview(null);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: (error as Error).message || "An unexpected error occurred",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload New Manga</CardTitle>
            <CardDescription>
              Fill in the details and upload your manga files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter manga title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter manga description"
                  required
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  required
                />
                {thumbnailPreview && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                    <img 
                      src={thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className="h-40 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mangaImage">Manga Image</Label>
                <Input
                  id="mangaImage"
                  type="file"
                  accept="image/*"
                  onChange={handleMangaImageChange}
                  required
                />
                {mangaPreview && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                    <img 
                      src={mangaPreview} 
                      alt="Manga preview" 
                      className="max-h-60 object-contain rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload Manga"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
