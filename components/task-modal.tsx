"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit3, Calendar, Clock } from "lucide-react"

interface Task {
  id: number
  task: string
  count: number
  urgent: boolean
  description?: string
  createdAt?: Date
  completed?: boolean
}

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onSave: (task: Omit<Task, "id">) => void
  onDelete: (taskId: number) => void
  mode: "add" | "view" | "edit"
}

export function TaskModal({ isOpen, onClose, task, onSave, onDelete, mode }: TaskModalProps) {
  const [formData, setFormData] = useState({
    task: "",
    count: 1,
    urgent: false,
    description: "",
  })

  useEffect(() => {
    if (task && (mode === "view" || mode === "edit")) {
      setFormData({
        task: task.task,
        count: task.count,
        urgent: task.urgent,
        description: task.description || "",
      })
    } else if (mode === "add") {
      setFormData({
        task: "",
        count: 1,
        urgent: false,
        description: "",
      })
    }
  }, [task, mode, isOpen])

  const handleSave = () => {
    if (!formData.task.trim()) return

    onSave({
      ...formData,
      createdAt: new Date(),
      completed: false,
    })
    onClose()
  }

  const handleDelete = () => {
    if (task) {
      onDelete(task.id)
      onClose()
    }
  }

  const getTitle = () => {
    switch (mode) {
      case "add":
        return "Add New Task"
      case "edit":
        return "Edit Task"
      case "view":
        return "Task Details"
      default:
        return "Task"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {mode === "edit" ? (
              <Edit3 className="h-5 w-5 text-blue-500" />
            ) : mode === "add" ? (
              <Calendar className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-slate-500" />
            )}
            <span>{getTitle()}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="task">Task Name</Label>
            <Input
              id="task"
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              placeholder="Enter task name..."
              disabled={mode === "view"}
              className="w-full"
            />
          </div>

          {/* Count and Urgent */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="count">Item Count</Label>
              <Input
                id="count"
                type="number"
                min="1"
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: Number.parseInt(e.target.value) || 1 })}
                disabled={mode === "view"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgent">Priority</Label>
              <div className="flex items-center space-x-2 h-10">
                <Switch
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked })}
                  disabled={mode === "view"}
                />
                <Badge
                  variant={formData.urgent ? "destructive" : "secondary"}
                  className={
                    formData.urgent
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }
                >
                  {formData.urgent ? "Urgent" : "Normal"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add task description..."
              disabled={mode === "view"}
              rows={3}
            />
          </div>

          {/* Created Date (View mode only) */}
          {mode === "view" && task?.createdAt && (
            <div className="space-y-2">
              <Label>Created</Label>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {task.createdAt.toLocaleDateString()} at {task.createdAt.toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <div>
            {mode === "view" && task && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Task
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {mode !== "view" && (
              <Button
                onClick={handleSave}
                disabled={!formData.task.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {mode === "add" ? "Add Task" : "Save Changes"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
