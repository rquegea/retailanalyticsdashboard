"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, MapPin, User, Plus, Eye, CheckSquare, X } from "lucide-react"
import { format } from "date-fns"
import type { Visit } from "@/lib/visits-data"

interface AssignedVisitsProps {
  visits: Visit[]
  onAssignVisit?: () => void
  onViewVisit?: (visit: Visit) => void
  onAddTask?: () => void
  onViewTask?: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function AssignedVisits({
  visits,
  onAssignVisit,
  onViewVisit,
  onAddTask,
  onViewTask,
  isMobileOpen,
  onMobileClose,
}: AssignedVisitsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "in-progress":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "high":
        return "bg-orange-100 text-orange-700"
      case "urgent":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const todayVisits = visits.filter((visit) => {
    const today = new Date()
    const visitDate = new Date(visit.date)
    return visitDate.toDateString() === today.toDateString()
  })

  const upcomingVisits = visits.filter((visit) => {
    const today = new Date()
    const visitDate = new Date(visit.date)
    return visitDate > today
  })

  return (
    <div className="h-full bg-white">
      {/* Mobile Header */}
      {isMobileOpen && onMobileClose && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Visit Management</h2>
          <Button variant="ghost" size="sm" onClick={onMobileClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={onAssignVisit} className="w-full justify-start bg-blue-600 hover:bg-blue-700" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Assign New Visit
              </Button>
              <Button onClick={onAddTask} variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <CheckSquare className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <Button onClick={onViewTask} variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          {/* Today's Visits */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Today's Visits ({todayVisits.length})</h3>
            <div className="space-y-3">
              {todayVisits.length === 0 ? (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No visits scheduled for today</p>
                  </CardContent>
                </Card>
              ) : (
                todayVisits.map((visit) => (
                  <Card key={visit.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{visit.title}</h4>
                          <Badge className={`${getStatusColor(visit.status)} text-xs`}>{visit.status}</Badge>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{visit.address}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{visit.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <User className="w-3 h-3" />
                            <span>{visit.assignee}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={`${getPriorityColor(visit.priority)} text-xs`}>{visit.priority}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewVisit?.(visit)}
                            className="h-6 px-2 text-xs"
                          >
                            View
                          </Button>
                        </div>

                        {visit.progress > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                                style={{ width: `${visit.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-900">{visit.progress}%</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Visits */}
          {upcomingVisits.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Upcoming Visits ({upcomingVisits.length})</h3>
                <div className="space-y-3">
                  {upcomingVisits.slice(0, 5).map((visit) => (
                    <Card key={visit.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{visit.title}</h4>
                            <Badge className={`${getPriorityColor(visit.priority)} text-xs`}>{visit.priority}</Badge>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Calendar className="w-3 h-3" />
                              <span>{format(new Date(visit.date), "MMM dd")}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{visit.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <User className="w-3 h-3" />
                              <span>{visit.assignee}</span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewVisit?.(visit)}
                            className="w-full h-6 text-xs"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
