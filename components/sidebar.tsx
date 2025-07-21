"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart3, Calendar, MapPin, MessageSquare, Settings, Home, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Visits", href: "/visits", icon: MapPin },
  { name: "AI Assistant", href: "/ai", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true) // Default to collapsed
  const [mounted, setMounted] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebar-collapsed")
    if (savedCollapsed !== null) {
      setCollapsed(JSON.parse(savedCollapsed))
    }
    setMounted(true)
  }, [])

  // Save collapsed state to localStorage whenever it changes
  const toggleCollapsed = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newCollapsed))
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex flex-col h-screen bg-white border-r border-slate-200 w-16">
        <div className="flex items-center justify-center p-4 border-b border-slate-200">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex flex-col h-screen bg-white border-r border-slate-200 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-slate-900">RetailAnalytics</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">R</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className={cn("h-8 w-8 p-0", collapsed && "absolute top-4 right-2")}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const buttonContent = (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    collapsed ? "justify-center px-2 h-12" : "justify-start px-3",
                    isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              )

              if (collapsed) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>{buttonContent}</Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <Link key={item.name} href={item.href}>
                  {buttonContent}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        {!collapsed && (
          <>
            <Separator />
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 font-medium text-sm">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
                  <p className="text-xs text-slate-500 truncate">GPV Manager</p>
                </div>
              </div>
            </div>
          </>
        )}

        {collapsed && (
          <div className="p-4 border-t border-slate-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center mx-auto cursor-pointer">
                  <span className="text-slate-600 font-medium text-sm">JD</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>John Doe - GPV Manager</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
