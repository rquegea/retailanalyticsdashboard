"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Filter, Sparkles, RotateCcw } from "lucide-react"

interface HeaderProps {
  selectedChain: string
  setSelectedChain: (chain: string) => void
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
  selectedProduct: string
  setSelectedProduct: (product: string) => void
  dateRange: string
  setDateRange: (range: string) => void
  dataMode: string
  setDataMode: (mode: string) => void
  aiPanelOpen: boolean
  setAiPanelOpen: (open: boolean) => void
  onDateRangeChange: (from: Date | undefined, to: Date | undefined) => void
}

export function Header({
  selectedChain,
  setSelectedChain,
  selectedBrand,
  setSelectedBrand,
  selectedProduct,
  setSelectedProduct,
  dateRange,
  setDateRange,
  dataMode,
  setDataMode,
  aiPanelOpen,
  setAiPanelOpen,
  onDateRangeChange,
}: HeaderProps) {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const chains = ["all", "Mercadona", "Carrefour", "Día", "Alcampo"]
  const brands = ["all", "Oreo", "Nutella", "Coca-Cola", "Nestlé"]
  const products = ["all", "Oreo Original", "Nutella 400g", "Coca-Cola 330ml", "Cereales Nestlé"]

  const handleDateFromSelect = (date: Date | undefined) => {
    setDateFrom(date)
    onDateRangeChange(date, dateTo)
  }

  const handleDateToSelect = (date: Date | undefined) => {
    setDateTo(date)
    onDateRangeChange(dateFrom, date)
  }

  const handleQuickDateRange = (days: number) => {
    const to = new Date()
    const from = new Date()
    from.setDate(to.getDate() - days)
    setDateFrom(from)
    setDateTo(to)
    onDateRangeChange(from, to)
  }

  const resetFilters = () => {
    setSelectedChain("all")
    setSelectedBrand("all")
    setSelectedProduct("all")
    setDateRange("30d")
    setDataMode("global")
    setDateFrom(undefined)
    setDateTo(undefined)
    onDateRangeChange(undefined, undefined)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedChain !== "all") count++
    if (selectedBrand !== "all") count++
    if (selectedProduct !== "all") count++
    if (dateFrom || dateTo) count++
    if (dataMode !== "global") count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Analytics Dashboard</h1>

          {/* Mobile Filters Button */}
          <div className="lg:hidden">
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <span>Filtros</span>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={resetFilters}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    )}
                  </SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                  {/* Chain Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Cadena</label>
                    <Select value={selectedChain} onValueChange={setSelectedChain}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las cadenas</SelectItem>
                        {chains.slice(1).map((chain) => (
                          <SelectItem key={chain} value={chain}>
                            {chain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Brand Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Marca</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las marcas</SelectItem>
                        {brands.slice(1).map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Product Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Producto</label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los productos</SelectItem>
                        {products.slice(1).map((product) => (
                          <SelectItem key={product} value={product}>
                            {product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Date Range */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Rango de fechas</label>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleQuickDateRange(7)} className="flex-1">
                          7 días
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleQuickDateRange(30)} className="flex-1">
                          30 días
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !dateFrom && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateFrom ? format(dateFrom, "dd/MM/yy") : "Desde"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={dateFrom} onSelect={handleDateFromSelect} initialFocus />
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateTo ? format(dateTo, "dd/MM/yy") : "Hasta"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={dateTo} onSelect={handleDateToSelect} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Data Mode */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Modo de datos</label>
                    <Select value={dataMode} onValueChange={setDataMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="regional">Regional</SelectItem>
                        <SelectItem value="local">Local</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Filters - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-4">
          <Select value={selectedChain} onValueChange={setSelectedChain}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chains</SelectItem>
              {chains.slice(1).map((chain) => (
                <SelectItem key={chain} value={chain}>
                  {chain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.slice(1).map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {products.slice(1).map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-32 justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd/MM/yy") : "From"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={handleDateFromSelect} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-32 justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd/MM/yy") : "To"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateTo} onSelect={handleDateToSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <Select value={dataMode} onValueChange={setDataMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="regional">Regional</SelectItem>
              <SelectItem value="local">Local</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Panel Toggle */}
        <Button
          variant={aiPanelOpen ? "default" : "outline"}
          onClick={() => setAiPanelOpen(!aiPanelOpen)}
          className="ml-4"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">AI Assistant</span>
          <span className="sm:hidden">AI</span>
        </Button>
      </div>
    </div>
  )
}
