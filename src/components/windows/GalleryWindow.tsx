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

type Category = 'street photography' | 'landscape' | 'sculpture';

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

const categories: Category[] = ['street photography', 'landscape', 'sculpture'];

export const GalleryWindow = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('street photography');

  const filteredPhotos = photos.filter(photo => photo.category === selectedCategory);

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
            className="rounded-lg overflow-hidden bg-muted"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-contain bg-muted"
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
    </div>
  );
};