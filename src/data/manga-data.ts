
export interface Manga {
  id: string;
  title: string;
  description: string;
  thumbnailPath: string;
  mangaPath: string;
  uploadDate: string;
}

export const mangaData: Manga[] = [
  {
    id: "1",
    title: "The Lonely Swordsman",
    description: "A tale of a wandering swordsman searching for meaning in a world torn by war.",
    thumbnailPath: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    mangaPath: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    uploadDate: "2023-10-15"
  },
  {
    id: "2",
    title: "Cyber Academy",
    description: "Students with supernatural abilities learn to control their powers in a high-tech academy.",
    thumbnailPath: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    mangaPath: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    uploadDate: "2023-11-20"
  },
  {
    id: "3",
    title: "Code Warriors",
    description: "Programmers battle in virtual reality where code becomes power and bugs become monsters.",
    thumbnailPath: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    mangaPath: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    uploadDate: "2023-12-05"
  },
  {
    id: "4",
    title: "Digital Dreams",
    description: "A journey into the digital world where reality and virtual existence blur into one.",
    thumbnailPath: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    mangaPath: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    uploadDate: "2024-01-10"
  },
  {
    id: "5",
    title: "Glass Kingdom",
    description: "A kingdom made of glass where transparency is valued above all else, until secrets emerge.",
    thumbnailPath: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    mangaPath: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    uploadDate: "2024-02-15"
  }
];
