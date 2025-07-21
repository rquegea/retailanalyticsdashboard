"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KPIOverview } from "@/components/kpi-overview"
import { SupermarketExplorer } from "@/components/supermarket-explorer"
import { BrandProductTable } from "@/components/brand-product-table"
import { ImageCarousel } from "@/components/image-carousel"
import { SmartInsights } from "@/components/smart-insights"
import { AIAssistant } from "@/components/ai-assistant"
import { ThemeProvider } from "@/components/theme-provider"

export default function AnalyticsPage() {
  const [selectedChain, setSelectedChain] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [dateRange, setDateRange] = useState("30d")
  const [dataMode, setDataMode] = useState("global")
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | undefined>()
  const [dateTo, setDateTo] = useState<Date | undefined>()

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setDateFrom(from)
    setDateTo(to)
    console.log("Date range changed:", { from, to })
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
        {/* Sidebar - Always visible */}
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            dateRange={dateRange}
            setDateRange={setDateRange}
            dataMode={dataMode}
            setDataMode={setDataMode}
            aiPanelOpen={aiPanelOpen}
            setAiPanelOpen={setAiPanelOpen}
            onDateRangeChange={handleDateRangeChange}
          />

          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 md:px-6 py-6 max-w-7xl">
              {/* KPI Overview */}
              <div className="mb-8">
                <KPIOverview
                  selectedChain={selectedChain}
                  selectedBrand={selectedBrand}
                  selectedProduct={selectedProduct}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                />
              </div>

              {/* Supermarket Explorer */}
              <div className="mb-8">
                <SupermarketExplorer
                  selectedChain={selectedChain}
                  onChainSelect={setSelectedChain}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                />
              </div>

              {/* Brand & Product Performance */}
              <div className="mb-8">
                <BrandProductTable
                  selectedChain={selectedChain}
                  selectedBrand={selectedBrand}
                  selectedProduct={selectedProduct}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                />
              </div>

              {/* Bottom Section - Images and Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ImageCarousel
                  selectedChain={selectedChain}
                  selectedBrand={selectedBrand}
                  selectedProduct={selectedProduct}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                />
                <SmartInsights
                  selectedChain={selectedChain}
                  selectedBrand={selectedBrand}
                  selectedProduct={selectedProduct}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Side Panel */}
        <AIAssistant isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} />
      </div>
    </ThemeProvider>
  )
}
