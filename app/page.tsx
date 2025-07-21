"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { VisitModal } from "@/components/calendar/visit-modal"
import { TaskModal } from "@/components/task-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  MapPin,
  Clock,
  Camera,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Play,
  Eye,
  Upload,
  BarChart3,
  Target,
  Sun,
  Moon,
  Plus,
  MoreHorizontal,
  Edit3,
  Trash2,
  Check,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

interface Task {
  id: number
  task: string
  count: number
  urgent: boolean
  description?: string
  createdAt?: Date
  isDeleting?: boolean
  completed?: boolean
}

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const [selectedVisit, setSelectedVisit] = useState<any>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [taskModalMode, setTaskModalMode] = useState<"add" | "view" | "edit">("add")

  const [pendingTasks, setPendingTasks] = useState<Task[]>([
    {
      id: 1,
      task: "Upload photos from yesterday's visits",
      count: 8,
      urgent: true,
      description: "Need to upload and categorize photos from Carrefour and Mercadona visits",
      createdAt: new Date(2025, 0, 17, 9, 30),
      completed: false,
    },
    {
      id: 2,
      task: "Review shelf share reports",
      count: 3,
      urgent: false,
      description: "Analyze weekly shelf share performance across all brands",
      createdAt: new Date(2025, 0, 17, 10, 15),
      completed: false,
    },
    {
      id: 3,
      task: "Follow up on missing products",
      count: 5,
      urgent: true,
      description: "Contact store managers about Oreo stock issues in Día stores",
      createdAt: new Date(2025, 0, 17, 11, 0),
      completed: false,
    },
    {
      id: 4,
      task: "Update inventory counts",
      count: 12,
      urgent: false,
      description: "Update system with latest inventory data from field visits",
      createdAt: new Date(2025, 0, 17, 14, 20),
      completed: false,
    },
    {
      id: 5,
      task: "Contact store managers",
      count: 2,
      urgent: true,
      description: "Schedule meetings with Lidl managers regarding shelf positioning",
      createdAt: new Date(2025, 0, 17, 15, 45),
      completed: false,
    },
    {
      id: 6,
      task: "Prepare weekly summary",
      count: 1,
      urgent: false,
      description: "Compile comprehensive weekly performance report for management",
      createdAt: new Date(2025, 0, 17, 16, 30),
      completed: false,
    },
  ])

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening"

  const todayVisits = [
    {
      id: "1",
      store: "Carrefour Alcobendas",
      time: "10:30 AM",
      status: "planned" as const,
      address: "C/ de la Chopera, 56",
      brand: "Oreo",
      assignedTo: "John Doe",
      date: new Date(2025, 0, 15),
    },
    {
      id: "2",
      store: "Mercadona Centro",
      time: "2:15 PM",
      status: "planned" as const,
      address: "Gran Vía, 28",
      brand: "Kinder",
      assignedTo: "John Doe",
      date: new Date(2025, 0, 15),
    },
  ]

  const kpiData = [
    {
      title: "Shelf Share Change",
      value: "+2.3%",
      trend: "up",
      subtitle: "vs last week",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Best Performing",
      value: "Oreo Original",
      trend: "up",
      subtitle: "87% coverage",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Most Active Chain",
      value: "Carrefour",
      trend: "neutral",
      subtitle: "24 visits assigned",
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      title: "Coverage Improvement",
      value: "94.2%",
      trend: "up",
      subtitle: "+5.1% this month",
      color: "text-emerald-600 dark:text-emerald-400",
    },
  ]

  const weekSummary = {
    completedVisits: 23,
    photosUploaded: 156,
    alertsResolved: 8,
    newIssues: 3,
  }

  const handleVisitClick = (visit: any) => {
    setSelectedVisit(visit)
  }

  const handleAddTask = () => {
    setSelectedTask(null)
    setTaskModalMode("add")
    setTaskModalOpen(true)
  }

  const handleTaskClick = (task: Task) => {
    if (task.completed) return
    setSelectedTask(task)
    setTaskModalMode("view")
    setTaskModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setTaskModalMode("edit")
    setTaskModalOpen(true)
  }

  const handleDeleteTask = (taskId: number) => {
    setPendingTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, isDeleting: true } : task)))
    setTimeout(() => {
      setPendingTasks((prev) => prev.filter((task) => task.id !== taskId))
    }, 300)
  }

  const handleToggleTask = (taskId: number) => {
    setPendingTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed }
          if (updatedTask.completed) {
            setTimeout(() => {
              setPendingTasks((currentTasks) => {
                const otherTasks = currentTasks.filter((t) => t.id !== taskId)
                const completedTask = currentTasks.find((t) => t.id === taskId)
                return completedTask ? [...otherTasks, completedTask] : currentTasks
              })
            }, 500)
          }
          return updatedTask
        }
        return task
      }),
    )
  }

  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (taskModalMode === "add") {
      const newTask: Task = {
        ...taskData,
        id: Math.max(...pendingTasks.map((t) => t.id), 0) + 1,
        completed: false,
      }
      setPendingTasks([...pendingTasks, newTask])
    } else if (selectedTask) {
      setPendingTasks(
        pendingTasks.map((task) => (task.id === selectedTask.id ? { ...taskData, id: selectedTask.id } : task)),
      )
    }
  }

  const sortedTasks = [...pendingTasks].sort((a, b) => {
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-white dark:bg-neutral-950">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Welcome Header */}
          <header className="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 px-4 md:px-8 py-4 md:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-2 ring-neutral-200 dark:ring-neutral-800">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {greeting}, John 👋
                  </h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Here's a summary of your activity today
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-9 w-9 rounded-full"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Today</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-neutral-50/50 dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
              {/* Performance Highlights */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {kpiData.map((kpi, index) => (
                  <Card
                    key={index}
                    className="bg-white/70 dark:bg-neutral-900/50 border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-neutral-900/70 transition-all duration-200"
                  >
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            {kpi.title}
                          </p>
                          <p className={`text-lg md:text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">{kpi.subtitle}</p>
                        </div>
                        <div className="flex items-center">
                          {kpi.trend === "up" && (
                            <div className="p-1.5 md:p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                              <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          )}
                          {kpi.trend === "down" && (
                            <div className="p-1.5 md:p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                              <TrendingDown className="h-3 w-3 md:h-4 md:w-4 text-red-600 dark:text-red-400" />
                            </div>
                          )}
                          {kpi.trend === "neutral" && (
                            <div className="p-1.5 md:p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                              <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-neutral-600 dark:text-neutral-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Today's Activity Panel */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Next Visits */}
                  <Card className="bg-white/70 dark:bg-neutral-900/50 border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        Today's Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {todayVisits.map((visit) => (
                        <div
                          key={visit.id}
                          onClick={() => handleVisitClick(visit)}
                          className="flex items-center justify-between p-4 bg-neutral-50/80 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{visit.store}</h4>
                              <Badge
                                variant={visit.status === "planned" ? "default" : "secondary"}
                                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0"
                              >
                                {visit.status}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {visit.time}
                              <MapPin className="h-3 w-3 ml-3 mr-1" />
                              {visit.address}
                            </div>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Brand: {visit.brand}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleVisitClick(visit)
                            }}
                            className="ml-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Pending Tasks */}
                  <Card className="bg-white/70 dark:bg-neutral-900/50 border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                          <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-3">
                            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          Tasks Pending Today
                        </CardTitle>
                        <Button
                          size="sm"
                          onClick={handleAddTask}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 w-8 p-0 rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[280px] px-6">
                        <div className="space-y-3 pb-4">
                          {sortedTasks.map((task) => (
                            <div
                              key={task.id}
                              className={`flex items-center justify-between p-4 bg-neutral-50/80 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 transition-all duration-300 cursor-pointer group ${
                                task.isDeleting
                                  ? "opacity-0 scale-95 transform translate-x-4"
                                  : "opacity-100 scale-100 transform translate-x-0"
                              } ${task.completed ? "opacity-60 bg-neutral-100/60 dark:bg-neutral-700/30" : ""}`}
                              onClick={() => handleTaskClick(task)}
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-6 w-6 p-0 rounded-full border-2 transition-all duration-200 ${
                                    task.completed
                                      ? "bg-emerald-500 border-emerald-500 text-white"
                                      : "border-neutral-300 dark:border-neutral-600 hover:border-emerald-500"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleTask(task.id)
                                  }}
                                >
                                  {task.completed && <Check className="h-3 w-3" />}
                                </Button>

                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <p
                                      className={`text-sm font-medium transition-all duration-200 ${
                                        task.completed
                                          ? "line-through text-neutral-500 dark:text-neutral-400"
                                          : "text-neutral-900 dark:text-neutral-100"
                                      }`}
                                    >
                                      {task.task}
                                    </p>
                                    {task.urgent && !task.completed && (
                                      <Badge
                                        variant="destructive"
                                        className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-0"
                                      >
                                        Urgent
                                      </Badge>
                                    )}
                                  </div>
                                  <p
                                    className={`text-xs transition-all duration-200 ${
                                      task.completed
                                        ? "text-neutral-400 dark:text-neutral-500"
                                        : "text-neutral-600 dark:text-neutral-400"
                                    }`}
                                  >
                                    {task.count} items
                                  </p>
                                </div>
                              </div>

                              {!task.completed && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="ml-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-40 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                                  >
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleEditTask(task)
                                      }}
                                      className="flex items-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    >
                                      <Edit3 className="h-4 w-4 mr-2" />
                                      Edit Task
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteTask(task.id)
                                      }}
                                      className="flex items-center cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Task
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Content */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Photos to Review */}
                  <Card className="bg-white/70 dark:bg-neutral-900/50 border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-3">
                            <Camera className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          Photos to Review
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-0"
                        >
                          12 new
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="aspect-square bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-700"
                          >
                            <img
                              src={`/placeholder.svg?height=80&width=80&query=store shelf ${i}`}
                              alt={`Store photo ${i}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent border-neutral-200 dark:border-neutral-700"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Review All
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload New
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card className="bg-white/70 dark:bg-neutral-900/50 border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        This Week Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {weekSummary.completedVisits}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Visits Completed</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50/80 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {weekSummary.photosUploaded}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Photos Uploaded</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-violet-50/80 dark:bg-violet-900/20 rounded-xl border border-violet-200/50 dark:border-violet-800/50">
                          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                            {weekSummary.alertsResolved}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Alerts Resolved</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50/80 dark:bg-orange-900/20 rounded-xl border border-orange-200/50 dark:border-orange-800/50">
                          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {weekSummary.newIssues}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">New Issues</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Quick Actions */}
                  <Card className="bg-white/70 dark:bg-neutral-900/50 border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/calendar">
                        <Button
                          variant="ghost"
                          className="w-full justify-start bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule New Visit
                        </Button>
                      </Link>
                      <Link href="/analytics">
                        <Button
                          variant="ghost"
                          className="w-full justify-start bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                      </Link>
                      <Link href="/ai">
                        <Button
                          variant="ghost"
                          className="w-full justify-start bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          AI Agent
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Performance Progress */}
                  <Card className="bg-white/70 dark:bg-neutral-900/50 border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Monthly Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-neutral-600 dark:text-neutral-400">Visits Completed</span>
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">78/100</span>
                        </div>
                        <Progress value={78} className="h-2 bg-neutral-200 dark:bg-neutral-700" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-neutral-600 dark:text-neutral-400">Coverage Target</span>
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">94.2/95%</span>
                        </div>
                        <Progress value={94.2} className="h-2 bg-neutral-200 dark:bg-neutral-700" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-neutral-600 dark:text-neutral-400">Issues Resolved</span>
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">23/25</span>
                        </div>
                        <Progress value={92} className="h-2 bg-neutral-200 dark:bg-neutral-700" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Visit Modal */}
        {selectedVisit && (
          <VisitModal visit={selectedVisit} isOpen={!!selectedVisit} onClose={() => setSelectedVisit(null)} />
        )}

        {/* Task Modal */}
        <TaskModal
          isOpen={taskModalOpen}
          onClose={() => setTaskModalOpen(false)}
          task={selectedTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          mode={taskModalMode}
        />
      </div>
    </ThemeProvider>
  )
}
