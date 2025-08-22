import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import street1 from "@/assets/gallery/street1.jpg";
import street2 from "@/assets/gallery/street2.jpg";
import landscape1 from "@/assets/gallery/landscape1.jpg";
import landscape2 from "@/assets/gallery/landscape2.jpg";
import sculpture1 from "@/assets/gallery/sculpture1.jpg";
import sculpture2 from "@/assets/gallery/sculpture2.jpg";

type Category = 'all' | 'street photography' | 'landscape' | 'sculpture';

interface Photo {
  id: string;
  src: string;
  title: string;
  category: Category;
}

const photos: Photo[] = [
  {
    id: '1',
    src: street1,
    title: 'Urban Shadows',
    category: 'street photography'
  },
  {
    id: '2',
    src: street2,
    title: 'City Colors',
    category: 'street photography'
  },
  {
    id: '3',
    src: landscape1,
    title: 'Mountain Mist',
    category: 'landscape'
  },
  {
    id: '4',
    src: landscape2,
    title: 'Green Hills',
    category: 'landscape'
  },
  {
    id: '5',
    src: sculpture1,
    title: 'Classical Beauty',
    category: 'sculpture'
  },
  {
    id: '6',
    src: sculpture2,
    title: 'Modern Forms',
    category: 'sculpture'
  }
];

const categories: Category[] = ['all', 'street photography', 'landscape', 'sculpture'];

export const GalleryWindow = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="text-primary" size={24} />
        <h2 className="text-2xl font-bold text-foreground">Photo Gallery</h2>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 overflow-auto">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group cursor-pointer rounded-lg overflow-hidden bg-muted hover:bg-muted/80 transition-colors"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-foreground text-sm mb-1">{photo.title}</h3>
              <Badge variant="secondary" className="text-xs capitalize">
                {photo.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
              <h3 className="font-medium">{selectedPhoto.title}</h3>
              <p className="text-sm opacity-80 capitalize">{selectedPhoto.category}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};