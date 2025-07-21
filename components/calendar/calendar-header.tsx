"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Users, Store } from "lucide-react"
import { format } from "date-fns"

interface CalendarHeaderProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  viewMode: "month" | "week" | "day" | "agenda"
  setViewMode: (mode: "month" | "week" | "day" | "agenda") => void
  onAssignVisit: () => void
}

export function CalendarHeader({
  currentDate,
  setCurrentDate,
  viewMode,
  setViewMode,
  onAssignVisit,
}: CalendarHeaderProps) {
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Compact Mobile Header */}
      <div className="block md:hidden">
        {/* Top row - Title and Add button */}
        <div className="flex items-center justify-between p-4 pb-2">
          <h1 className="text-xl font-semibold text-gray-900">Calendar</h1>
          <Button onClick={onAssignVisit} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Second row - Navigation and date */}
        <div className="flex items-center justify-between px-4 pb-2">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <h2 className="text-lg font-medium text-gray-900">{format(currentDate, "MMM yyyy")}</h2>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Select value={viewMode} onValueChange={(value: "month" | "week" | "day" | "agenda") => setViewMode(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="agenda">Agenda</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Third row - Compact stats */}
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <Calendar className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-600 font-medium">Today</p>
                <p className="text-sm font-semibold text-blue-900">3 visits</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                <Clock className="w-3 h-3 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-orange-600 font-medium">In Progress</p>
                <p className="text-sm font-semibold text-orange-900">1 visit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        {/* Main Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              <Store className="w-3 h-3 mr-1" />
              Store Visits
            </Badge>
          </div>

          <Button onClick={onAssignVisit} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Assign Visit
          </Button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between px-6 pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>

            <h2 className="text-lg font-medium text-gray-900">{format(currentDate, "MMMM yyyy")}</h2>
          </div>

          <Select value={viewMode} onValueChange={(value: "month" | "week" | "day" | "agenda") => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 px-6 pb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Today</p>
                <p className="text-lg font-semibold text-blue-900">3 visits</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">In Progress</p>
                <p className="text-lg font-semibold text-orange-900">1 visit</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Team</p>
                <p className="text-lg font-semibold text-green-900">4 active</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Stores</p>
                <p className="text-lg font-semibold text-purple-900">12 total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
