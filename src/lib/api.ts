
import { Manga, mangaData } from "@/data/manga-data";
import { getStoredToken } from "./auth";

// In a real application, these would be actual API calls to a backend server
export async function getMangaList(): Promise<Manga[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mangaData;
}

export async function getMangaById(id: string): Promise<Manga | undefined> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mangaData.find(manga => manga.id === id);
}

// Simulated file upload
export async function uploadManga(
  formData: FormData
): Promise<Manga | null> {
  // Get the auth token
  const token = getStoredToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Extract form values
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as File;
  const mangaImage = formData.get("mangaImage") as File;
  
  if (!title || !description || !thumbnail || !mangaImage) {
    throw new Error("All fields are required");
  }
  
  // In a real app, files would be uploaded to a server
  // Here we create placeholder URLs
  const thumbnailPath = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7";
  const mangaPath = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7";
  
  // Create a new manga entry
  const newManga: Manga = {
    id: Date.now().toString(),
    title,
    description,
    thumbnailPath,
    mangaPath,
    uploadDate: new Date().toISOString().split('T')[0]
  };
  
  // In a real app, this would be saved to a database
  // For this demo, we'll just return the new manga object
  return newManga;
}
