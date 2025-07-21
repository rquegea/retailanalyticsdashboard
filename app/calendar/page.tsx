"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { AssignedVisits } from "@/components/calendar/assigned-visits"
import { AssignVisitModal } from "@/components/calendar/assign-visit-modal"
import { VisitModal } from "@/components/calendar/visit-modal"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { visitsData, type Visit } from "@/lib/visits-data"
import { Menu } from "lucide-react"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "agenda">("month")
  const [visits, setVisits] = useState<Visit[]>(visitsData)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false)
  const [isMobileManagementOpen, setIsMobileManagementOpen] = useState(false)

  // Filter visits for the current month/week
  const getVisitsForPeriod = () => {
    if (viewMode === "month") {
      return visits.filter((visit) => {
        const visitDate = new Date(visit.date)
        return visitDate.getMonth() === currentDate.getMonth() && visitDate.getFullYear() === currentDate.getFullYear()
      })
    } else {
      // Week view logic
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return visits.filter((visit) => {
        const visitDate = new Date(visit.date)
        return visitDate >= startOfWeek && visitDate <= endOfWeek
      })
    }
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsAssignModalOpen(true)
  }

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit)
    setIsVisitModalOpen(true)
  }

  const handleAssignVisit = (visitData: Omit<Visit, "id">) => {
    const newVisit: Visit = {
      ...visitData,
      id: Date.now().toString(),
    }
    setVisits([...visits, newVisit])
    setIsAssignModalOpen(false)
    setSelectedDate(null)
  }

  const filteredVisits = getVisitsForPeriod()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Always visible */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Calendar Header - Now responsive */}
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onAssignVisit={() => setIsAssignModalOpen(true)}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Calendar Area - More space on mobile */}
          <div className="flex-1 overflow-auto p-2 md:p-6">
            <CalendarGrid
              currentDate={currentDate}
              viewMode={viewMode}
              visits={filteredVisits}
              onDateClick={handleDateClick}
              onVisitClick={handleVisitClick}
            />
          </div>

          {/* Desktop Management Sidebar - Hidden on mobile for more space */}
          <div className="hidden lg:block w-80 bg-white border-l border-gray-200">
            <AssignedVisits
              visits={filteredVisits}
              onAssignVisit={() => setIsAssignModalOpen(true)}
              onViewVisit={handleVisitClick}
              onAddTask={() => {
                // Handle add task
              }}
              onViewTask={() => {
                // Handle view task
              }}
            />
          </div>

          {/* Mobile Management Panel - Floating button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-10">
            <Sheet open={isMobileManagementOpen} onOpenChange={setIsMobileManagementOpen}>
              <SheetTrigger asChild>
                <Button className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <AssignedVisits
                  visits={filteredVisits}
                  onAssignVisit={() => {
                    setIsMobileManagementOpen(false)
                    setIsAssignModalOpen(true)
                  }}
                  onViewVisit={(visit) => {
                    setIsMobileManagementOpen(false)
                    handleVisitClick(visit)
                  }}
                  onAddTask={() => {
                    // Handle add task
                  }}
                  onViewTask={() => {
                    // Handle view task
                  }}
                  isMobileOpen={isMobileManagementOpen}
                  onMobileClose={() => setIsMobileManagementOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AssignVisitModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false)
          setSelectedDate(null)
        }}
        selectedDate={selectedDate}
        onAssign={handleAssignVisit}
      />

      <VisitModal
        isOpen={isVisitModalOpen}
        onClose={() => {
          setIsVisitModalOpen(false)
          setSelectedVisit(null)
        }}
        visit={selectedVisit}
      />
    </div>
  )
}
