"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, AlertTriangle, Target, ArrowRight } from "lucide-react"

interface SmartInsightsProps {
  selectedChain: string
  selectedBrand: string
}

export function SmartInsights({ selectedChain, selectedBrand }: SmartInsightsProps) {
  const insights = [
    {
      type: "opportunity",
      title: "Shelf Share Growth Opportunity",
      description:
        "Oreo has 23% higher facings in Carrefour compared to Mercadona. Consider increasing presence in Mercadona.",
      impact: "High",
      icon: TrendingUp,
      color: "green",
    },
    {
      type: "alert",
      title: "Price Positioning Alert",
      description: "Your average price is 15% higher than competitors in the premium cookie segment.",
      impact: "Medium",
      icon: AlertTriangle,
      color: "yellow",
    },
    {
      type: "recommendation",
      title: "Promotional Strategy",
      description: "Stores with promotional displays show 34% higher sales. Consider expanding promotional presence.",
      impact: "High",
      icon: Target,
      color: "blue",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-500"
      case "yellow":
        return "text-yellow-500"
      case "blue":
        return "text-blue-500"
      default:
        return "text-slate-500"
    }
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span>Smart Insights</span>
          <Badge
            variant="secondary"
            className="ml-auto bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20"
          >
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon

            return (
              <Card
                key={index}
                className="p-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-${insight.color}-100 dark:bg-${insight.color}-900/20`}>
                    <Icon
                      className={`h-4 w-4 ${getIconColor(insight.color)} ${insight.type === "alert" ? "animate-pulse" : ""}`}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">{insight.title}</h4>
                      <Badge
                        variant="outline"
                        className={`${getImpactColor(insight.impact)} hover:scale-105 transition-transform duration-200`}
                      >
                        {insight.impact} Impact
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{insight.description}</p>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto font-medium group"
                    >
                      Learn more
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
