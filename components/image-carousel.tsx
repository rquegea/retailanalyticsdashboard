"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, ChevronLeft, ChevronRight, Eye, MapPin } from "lucide-react"
import { useState } from "react"

interface ImageCarouselProps {
  selectedChain: string
  selectedBrand: string
}

export function ImageCarousel({ selectedChain, selectedBrand }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    {
      id: 1,
      url: "/placeholder.svg?height=300&width=400&text=Oreo+Display+1",
      store: "Carrefour Madrid",
      facings: 4,
      shelfShare: "15.2%",
      date: "2024-01-15",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=300&width=400&text=Oreo+Display+2",
      store: "Mercadona Valencia",
      facings: 3,
      shelfShare: "12.8%",
      date: "2024-01-14",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=300&width=400&text=Oreo+Display+3",
      store: "Lidl Barcelona",
      facings: 2,
      shelfShare: "8.5%",
      date: "2024-01-13",
    },
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-purple-500" />
          <span>Store Images</span>
          <Badge variant="secondary" className="ml-auto">
            {images.length} photos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden group">
            <img
              src={images[currentImage].url || "/placeholder.svg"}
              alt={`Store display ${currentImage + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {images[currentImage].store}
                </span>
              </div>
              <span className="text-xs text-slate-500">{images[currentImage].date}</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {images[currentImage].facings} facings
                </span>
              </div>
              <Badge variant="outline" className="hover:scale-105 transition-transform duration-200">
                {images[currentImage].shelfShare} shelf share
              </Badge>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImage
                    ? "bg-blue-500 scale-125"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
