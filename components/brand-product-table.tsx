"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Euro, Camera, Eye, TrendingUp, TrendingDown } from "lucide-react"

interface BrandProductTableProps {
  selectedChain: string
  selectedBrand: string
  selectedProduct: string
}

export function BrandProductTable({ selectedChain, selectedBrand, selectedProduct }: BrandProductTableProps) {
  const products = [
    {
      brand: "Oreo",
      product: "Original Cookies",
      price: "€2.89",
      facings: 4,
      photos: 12,
      shelfShare: "15.2%",
      trend: "up",
      change: "+2.1%",
    },
    {
      brand: "Kinder",
      product: "Bueno",
      price: "€3.45",
      facings: 2,
      photos: 8,
      shelfShare: "8.7%",
      trend: "down",
      change: "-1.3%",
    },
    {
      brand: "Nestlé",
      product: "KitKat",
      price: "€2.15",
      facings: 3,
      photos: 15,
      shelfShare: "12.4%",
      trend: "up",
      change: "+0.8%",
    },
    {
      brand: "Ferrero",
      product: "Nutella",
      price: "€4.99",
      facings: 5,
      photos: 20,
      shelfShare: "18.9%",
      trend: "up",
      change: "+3.2%",
    },
  ]

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5 text-green-500" />
          <span>Brand & Product Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Facings</TableHead>
                <TableHead className="text-center">Photos</TableHead>
                <TableHead className="text-center">Shelf Share</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => {
                const TrendIcon = product.trend === "up" ? TrendingUp : TrendingDown

                return (
                  <TableRow
                    key={index}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200 group"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{product.brand.charAt(0)}</span>
                        </div>
                        <span>{product.brand}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.product}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Euro className="h-3 w-3 text-green-500 group-hover:scale-110 transition-transform duration-200" />
                        <span>{product.price.replace("€", "")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="group-hover:scale-105 transition-transform duration-200">
                        <Eye className="h-3 w-3 mr-1" />
                        {product.facings}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="group-hover:scale-105 transition-transform duration-200">
                        <Camera className="h-3 w-3 mr-1" />
                        {product.photos}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-medium">{product.shelfShare}</span>
                        <Badge
                          variant={product.trend === "up" ? "default" : "destructive"}
                          className={`${
                            product.trend === "up"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:scale-105"
                              : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 hover:scale-105"
                          } transition-transform duration-200`}
                        >
                          <TrendIcon
                            className={`h-3 w-3 mr-1 ${product.trend === "up" ? "animate-bounce" : "animate-pulse"}`}
                          />
                          {product.change}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:scale-105 transition-transform duration-200 bg-transparent"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
