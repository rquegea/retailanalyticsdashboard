"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, MapPin, User, AlertCircle, Timer } from "lucide-react"

interface Visit {
  id: string
  title: string
  date: Date
  time: string
  status: "planned" | "in-progress" | "completed"
  assignee: string
  store: string
  duration: number
  priority: "low" | "medium" | "high" | "urgent"
  notes?: string
}

interface AssignVisitModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate?: Date
  selectedTime?: string
  onCreateVisit: (visitData: Omit<Visit, "id">) => void
}

export function AssignVisitModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onCreateVisit,
}: AssignVisitModalProps) {
  const [formData, setFormData] = useState({
    date: "",
    time: "10:00",
    store: "",
    assignTo: "",
    notes: "",
    estimatedDuration: "60",
    priority: "medium",
  })

  // Function to format date correctly without timezone issues
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Update form data when selectedDate or selectedTime changes
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = formatDateForInput(selectedDate)
      console.log("Selected date:", selectedDate, "Formatted:", formattedDate)
      setFormData((prev) => ({
        ...prev,
        date: formattedDate,
      }))
    }
    if (selectedTime) {
      setFormData((prev) => ({
        ...prev,
        time: selectedTime,
      }))
    }
  }, [selectedDate, selectedTime])

  // Reset form when modal opens without selected date
  useEffect(() => {
    if (isOpen && !selectedDate) {
      const today = new Date()
      const formattedDate = formatDateForInput(today)
      setFormData((prev) => ({
        ...prev,
        date: formattedDate,
        time: selectedTime || "10:00",
      }))
    }
  }, [isOpen, selectedDate, selectedTime])

  const stores = [
    { value: "carrefour-madrid", label: "Carrefour Madrid Centro" },
    { value: "mercadona-barcelona", label: "Mercadona Barcelona Eixample" },
    { value: "lidl-valencia", label: "Lidl Valencia Centro" },
    { value: "dia-sevilla", label: "Día Sevilla Norte" },
    { value: "eci-sanchinarro", label: "ECI Sanchinarro" },
    { value: "carrefour-alcala", label: "Carrefour Alcalá" },
    { value: "dia-malasana", label: "Día Malasaña" },
  ]

  const teamMembers = [
    { value: "maria-garcia", label: "María García" },
    { value: "carlos-lopez", label: "Carlos López" },
    { value: "ana-martinez", label: "Ana Martínez" },
    { value: "david-rodriguez", label: "David Rodríguez" },
    { value: "john-doe", label: "John Doe" },
    { value: "jane-smith", label: "Jane Smith" },
    { value: "sarah-wilson", label: "Sarah Wilson" },
  ]

  const durationOptions = [
    { value: "30", label: "30 minutes", color: "bg-green-100 text-green-700" },
    { value: "45", label: "45 minutes", color: "bg-green-100 text-green-700" },
    { value: "60", label: "1 hour", color: "bg-blue-100 text-blue-700" },
    { value: "90", label: "1.5 hours", color: "bg-blue-100 text-blue-700" },
    { value: "120", label: "2 hours", color: "bg-orange-100 text-orange-700" },
    { value: "150", label: "2.5 hours", color: "bg-orange-100 text-orange-700" },
    { value: "180", label: "3 hours", color: "bg-red-100 text-red-700" },
    { value: "240", label: "4 hours", color: "bg-red-100 text-red-700" },
  ]

  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-700" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-700" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" },
  ]

  const calculateEndTime = () => {
    if (!formData.time || !formData.estimatedDuration) return null

    const [hours, minutes] = formData.time.split(":").map(Number)
    const startMinutes = hours * 60 + minutes
    const endMinutes = startMinutes + Number.parseInt(formData.estimatedDuration)

    const endHours = Math.floor(endMinutes / 60)
    const endMins = endMinutes % 60

    return `${endHours.toString().padStart(2, "0")}:${endMins.toString().padStart(2, "0")}`
  }

  const getSelectedDuration = () => {
    return durationOptions.find((option) => option.value === formData.estimatedDuration)
  }

  const getSelectedPriority = () => {
    return priorityOptions.find((option) => option.value === formData.priority)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Parse the date from the form
    const [year, month, day] = formData.date.split("-").map(Number)
    const visitDate = new Date(year, month - 1, day) // month is 0-indexed

    // Get store and assignee labels
    const selectedStore = stores.find((store) => store.value === formData.store)
    const selectedAssignee = teamMembers.find((member) => member.value === formData.assignTo)

    if (!selectedStore || !selectedAssignee) {
      alert("Please select both store and assignee")
      return
    }

    const visitData: Omit<Visit, "id"> = {
      title: selectedStore.label,
      date: visitDate,
      time: formData.time,
      status: "planned",
      assignee: selectedAssignee.label,
      store: selectedStore.label,
      duration: Number.parseInt(formData.estimatedDuration),
      priority: formData.priority as "low" | "medium" | "high" | "urgent",
      notes: formData.notes || undefined,
    }

    onCreateVisit(visitData)

    // Reset form
    setFormData({
      date: "",
      time: "10:00",
      store: "",
      assignTo: "",
      notes: "",
      estimatedDuration: "60",
      priority: "medium",
    })
  }

  const endTime = calculateEndTime()
  const selectedDuration = getSelectedDuration()
  const selectedPriority = getSelectedPriority()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Assign New Visit
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          {/* Time and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration</Label>
              <Select
                value={formData.estimatedDuration}
                onValueChange={(value) => setFormData({ ...formData, estimatedDuration: value })}
              >
                <SelectTrigger>
                  <Timer className="w-4 h-4 mr-2 text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        <Badge className={`text-xs ${option.color}`}>{option.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time Window Alert */}
          {endTime && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center gap-2">
                  <span>
                    Visit window:{" "}
                    <strong>
                      {formData.time} - {endTime}
                    </strong>
                  </span>
                  {selectedDuration && (
                    <Badge className={`text-xs ${selectedDuration.color}`}>{selectedDuration.label}</Badge>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Store */}
          <div className="space-y-2">
            <Label htmlFor="store">Store</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Select value={formData.store} onValueChange={(value) => setFormData({ ...formData, store: value })}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.value} value={store.value}>
                      {store.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assign to and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignTo">Assign to</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Select
                  value={formData.assignTo}
                  onValueChange={(value) => setFormData({ ...formData, assignTo: value })}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.value} value={member.value}>
                        {member.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        <Badge className={`text-xs ${option.color}`}>{option.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Assign Visit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
