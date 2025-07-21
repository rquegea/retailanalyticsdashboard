"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Plus, Edit, Trash2, Settings, Building2, Store, Tag, Users, Bell, Shield, Save, X } from "lucide-react"

interface Brand {
  id: string
  name: string
  category: string
}

interface Chain {
  id: string
  name: string
  storeCount: number
  regions: string[]
}

interface Supermarket {
  id: string
  name: string
  chain: string
  address: string
  city: string
}

export default function SettingsPage() {
  // Brands state
  const [brands, setBrands] = useState<Brand[]>([
    { id: "1", name: "Oreo", category: "Galletas" },
    { id: "2", name: "Nutella", category: "Untables" },
    { id: "3", name: "Coca-Cola", category: "Bebidas" },
    { id: "4", name: "Nestlé", category: "Cereales" },
  ])

  // Chains state
  const [chains, setChains] = useState<Chain[]>([
    { id: "1", name: "Mercadona", storeCount: 1636, regions: ["Valencia", "Madrid", "Cataluña"] },
    { id: "2", name: "Carrefour", storeCount: 1200, regions: ["Madrid", "Barcelona", "Sevilla"] },
    { id: "3", name: "Día", storeCount: 3000, regions: ["Madrid", "Valencia", "Andalucía"] },
    { id: "4", name: "Alcampo", storeCount: 50, regions: ["Madrid", "Barcelona", "Valencia"] },
  ])

  // Supermarkets state
  const [supermarkets, setSupermarkets] = useState<Supermarket[]>([
    { id: "1", name: "ECI Sanchinarro", chain: "Carrefour", address: "C/ de Alcalá, 658", city: "Madrid" },
    { id: "2", name: "Carrefour Alcalá", chain: "Carrefour", address: "Av. de América, 7", city: "Madrid" },
    { id: "3", name: "Día Malasaña", chain: "Día", address: "C/ de Fuencarral, 45", city: "Madrid" },
    { id: "4", name: "Mercadona Chamberí", chain: "Mercadona", address: "C/ de Bravo Murillo, 123", city: "Madrid" },
  ])

  // Modal states
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false)
  const [isAddChainOpen, setIsAddChainOpen] = useState(false)
  const [isAddSupermarketOpen, setIsAddSupermarketOpen] = useState(false)
  const [isEditBrandOpen, setIsEditBrandOpen] = useState(false)
  const [isEditChainOpen, setIsEditChainOpen] = useState(false)
  const [isEditSupermarketOpen, setIsEditSupermarketOpen] = useState(false)

  // Form states
  const [newBrand, setNewBrand] = useState({ name: "", category: "" })
  const [newChain, setNewChain] = useState({ name: "", storeCount: "", regions: "" })
  const [newSupermarket, setNewSupermarket] = useState({ name: "", chain: "", address: "", city: "" })

  // Edit states
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [editingChain, setEditingChain] = useState<Chain | null>(null)
  const [editingSupermarket, setEditingSupermarket] = useState<Supermarket | null>(null)

  // Settings states
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  })
  const [privacy, setPrivacy] = useState({
    analytics: true,
    marketing: false,
    thirdParty: false,
  })

  // Brand functions
  const handleAddBrand = () => {
    if (newBrand.name && newBrand.category) {
      const brand: Brand = {
        id: Date.now().toString(),
        name: newBrand.name,
        category: newBrand.category,
      }
      setBrands([...brands, brand])
      setNewBrand({ name: "", category: "" })
      setIsAddBrandOpen(false)
      toast.success("Brand añadida correctamente")
    }
  }

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand)
    setNewBrand({ name: brand.name, category: brand.category })
    setIsEditBrandOpen(true)
  }

  const handleUpdateBrand = () => {
    if (editingBrand && newBrand.name && newBrand.category) {
      const updatedBrands = brands.map((brand) =>
        brand.id === editingBrand.id ? { ...brand, name: newBrand.name, category: newBrand.category } : brand,
      )
      setBrands(updatedBrands)
      setNewBrand({ name: "", category: "" })
      setEditingBrand(null)
      setIsEditBrandOpen(false)
      toast.success("Brand actualizada correctamente")
    }
  }

  const handleDeleteBrand = (id: string) => {
    setBrands(brands.filter((brand) => brand.id !== id))
    toast.success("Brand eliminada correctamente")
  }

  // Chain functions
  const handleAddChain = () => {
    if (newChain.name && newChain.storeCount && newChain.regions) {
      const chain: Chain = {
        id: Date.now().toString(),
        name: newChain.name,
        storeCount: Number.parseInt(newChain.storeCount),
        regions: newChain.regions.split(",").map((r) => r.trim()),
      }
      setChains([...chains, chain])
      setNewChain({ name: "", storeCount: "", regions: "" })
      setIsAddChainOpen(false)
      toast.success("Cadena añadida correctamente")
    }
  }

  const handleEditChain = (chain: Chain) => {
    setEditingChain(chain)
    setNewChain({
      name: chain.name,
      storeCount: chain.storeCount.toString(),
      regions: chain.regions.join(", "),
    })
    setIsEditChainOpen(true)
  }

  const handleUpdateChain = () => {
    if (editingChain && newChain.name && newChain.storeCount && newChain.regions) {
      const updatedChains = chains.map((chain) =>
        chain.id === editingChain.id
          ? {
              ...chain,
              name: newChain.name,
              storeCount: Number.parseInt(newChain.storeCount),
              regions: newChain.regions.split(",").map((r) => r.trim()),
            }
          : chain,
      )
      setChains(updatedChains)
      setNewChain({ name: "", storeCount: "", regions: "" })
      setEditingChain(null)
      setIsEditChainOpen(false)
      toast.success("Cadena actualizada correctamente")
    }
  }

  const handleDeleteChain = (id: string) => {
    setChains(chains.filter((chain) => chain.id !== id))
    toast.success("Cadena eliminada correctamente")
  }

  // Supermarket functions
  const handleAddSupermarket = () => {
    if (newSupermarket.name && newSupermarket.chain && newSupermarket.address && newSupermarket.city) {
      const supermarket: Supermarket = {
        id: Date.now().toString(),
        name: newSupermarket.name,
        chain: newSupermarket.chain,
        address: newSupermarket.address,
        city: newSupermarket.city,
      }
      setSupermarkets([...supermarkets, supermarket])
      setNewSupermarket({ name: "", chain: "", address: "", city: "" })
      setIsAddSupermarketOpen(false)
      toast.success("Supermercado añadido correctamente")
    }
  }

  const handleEditSupermarket = (supermarket: Supermarket) => {
    setEditingSupermarket(supermarket)
    setNewSupermarket({
      name: supermarket.name,
      chain: supermarket.chain,
      address: supermarket.address,
      city: supermarket.city,
    })
    setIsEditSupermarketOpen(true)
  }

  const handleUpdateSupermarket = () => {
    if (
      editingSupermarket &&
      newSupermarket.name &&
      newSupermarket.chain &&
      newSupermarket.address &&
      newSupermarket.city
    ) {
      const updatedSupermarkets = supermarkets.map((supermarket) =>
        supermarket.id === editingSupermarket.id
          ? {
              ...supermarket,
              name: newSupermarket.name,
              chain: newSupermarket.chain,
              address: newSupermarket.address,
              city: newSupermarket.city,
            }
          : supermarket,
      )
      setSupermarkets(updatedSupermarkets)
      setNewSupermarket({ name: "", chain: "", address: "", city: "" })
      setEditingSupermarket(null)
      setIsEditSupermarketOpen(false)
      toast.success("Supermercado actualizado correctamente")
    }
  }

  const handleDeleteSupermarket = (id: string) => {
    setSupermarkets(supermarkets.filter((supermarket) => supermarket.id !== id))
    toast.success("Supermercado eliminado correctamente")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Always visible */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="data" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Datos Maestros
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Sistema
              </TabsTrigger>
            </TabsList>

            {/* Data Masters Tab */}
            <TabsContent value="data" className="space-y-6">
              {/* Brands Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Brands
                    </CardTitle>
                    <Dialog open={isAddBrandOpen} onOpenChange={setIsAddBrandOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Añadir Brand
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Añadir Nueva Brand</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="brand-name">Nombre</Label>
                            <Input
                              id="brand-name"
                              value={newBrand.name}
                              onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                              placeholder="Nombre de la brand"
                            />
                          </div>
                          <div>
                            <Label htmlFor="brand-category">Categoría</Label>
                            <Select
                              value={newBrand.category}
                              onValueChange={(value) => setNewBrand({ ...newBrand, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Galletas">Galletas</SelectItem>
                                <SelectItem value="Untables">Untables</SelectItem>
                                <SelectItem value="Bebidas">Bebidas</SelectItem>
                                <SelectItem value="Cereales">Cereales</SelectItem>
                                <SelectItem value="Lácteos">Lácteos</SelectItem>
                                <SelectItem value="Snacks">Snacks</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAddBrand} className="flex-1">
                              <Save className="w-4 h-4 mr-2" />
                              Guardar
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddBrandOpen(false)}>
                              <X className="w-4 h-4 mr-2" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{brand.name}</h3>
                          <Badge variant="secondary">{brand.category}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditBrand(brand)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteBrand(brand.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chains Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Cadenas
                    </CardTitle>
                    <Dialog open={isAddChainOpen} onOpenChange={setIsAddChainOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Añadir Cadena
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Añadir Nueva Cadena</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="chain-name">Nombre</Label>
                            <Input
                              id="chain-name"
                              value={newChain.name}
                              onChange={(e) => setNewChain({ ...newChain, name: e.target.value })}
                              placeholder="Nombre de la cadena"
                            />
                          </div>
                          <div>
                            <Label htmlFor="chain-stores">Número de tiendas</Label>
                            <Input
                              id="chain-stores"
                              type="number"
                              value={newChain.storeCount}
                              onChange={(e) => setNewChain({ ...newChain, storeCount: e.target.value })}
                              placeholder="1000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="chain-regions">Regiones (separadas por comas)</Label>
                            <Input
                              id="chain-regions"
                              value={newChain.regions}
                              onChange={(e) => setNewChain({ ...newChain, regions: e.target.value })}
                              placeholder="Madrid, Barcelona, Valencia"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAddChain} className="flex-1">
                              <Save className="w-4 h-4 mr-2" />
                              Guardar
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddChainOpen(false)}>
                              <X className="w-4 h-4 mr-2" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {chains.map((chain) => (
                      <div key={chain.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{chain.name}</h3>
                          <p className="text-sm text-gray-600">{chain.storeCount} tiendas</p>
                          <div className="flex gap-1 mt-1">
                            {chain.regions.map((region) => (
                              <Badge key={region} variant="outline" className="text-xs">
                                {region}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditChain(chain)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteChain(chain.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Supermarkets Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Store className="w-5 h-5" />
                      Supermercados
                    </CardTitle>
                    <Dialog open={isAddSupermarketOpen} onOpenChange={setIsAddSupermarketOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Añadir Supermercado
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Añadir Nuevo Supermercado</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="supermarket-name">Nombre</Label>
                            <Input
                              id="supermarket-name"
                              value={newSupermarket.name}
                              onChange={(e) => setNewSupermarket({ ...newSupermarket, name: e.target.value })}
                              placeholder="Nombre del supermercado"
                            />
                          </div>
                          <div>
                            <Label htmlFor="supermarket-chain">Cadena</Label>
                            <Select
                              value={newSupermarket.chain}
                              onValueChange={(value) => setNewSupermarket({ ...newSupermarket, chain: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una cadena" />
                              </SelectTrigger>
                              <SelectContent>
                                {chains.map((chain) => (
                                  <SelectItem key={chain.id} value={chain.name}>
                                    {chain.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="supermarket-address">Dirección</Label>
                            <Input
                              id="supermarket-address"
                              value={newSupermarket.address}
                              onChange={(e) => setNewSupermarket({ ...newSupermarket, address: e.target.value })}
                              placeholder="Dirección completa"
                            />
                          </div>
                          <div>
                            <Label htmlFor="supermarket-city">Ciudad</Label>
                            <Input
                              id="supermarket-city"
                              value={newSupermarket.city}
                              onChange={(e) => setNewSupermarket({ ...newSupermarket, city: e.target.value })}
                              placeholder="Ciudad"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAddSupermarket} className="flex-1">
                              <Save className="w-4 h-4 mr-2" />
                              Guardar
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddSupermarketOpen(false)}>
                              <X className="w-4 h-4 mr-2" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {supermarkets.map((supermarket) => (
                      <div key={supermarket.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{supermarket.name}</h3>
                          <Badge variant="secondary">{supermarket.chain}</Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {supermarket.address}, {supermarket.city}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditSupermarket(supermarket)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteSupermarket(supermarket.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Funcionalidad de usuarios próximamente...</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                        <p className="text-sm text-gray-600">Recibir notificaciones importantes por correo</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">Notificaciones Push</Label>
                        <p className="text-sm text-gray-600">Recibir notificaciones en el navegador</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications">Notificaciones SMS</Label>
                        <p className="text-sm text-gray-600">Recibir alertas urgentes por SMS</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración del Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analytics">Análisis y Métricas</Label>
                        <p className="text-sm text-gray-600">Permitir recopilación de datos para mejorar el servicio</p>
                      </div>
                      <Switch
                        id="analytics"
                        checked={privacy.analytics}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing">Comunicaciones de Marketing</Label>
                        <p className="text-sm text-gray-600">Recibir información sobre nuevas funcionalidades</p>
                      </div>
                      <Switch
                        id="marketing"
                        checked={privacy.marketing}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, marketing: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="third-party">Compartir con Terceros</Label>
                        <p className="text-sm text-gray-600">Permitir compartir datos con socios comerciales</p>
                      </div>
                      <Switch
                        id="third-party"
                        checked={privacy.thirdParty}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, thirdParty: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Brand Modal */}
      <Dialog open={isEditBrandOpen} onOpenChange={setIsEditBrandOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Brand</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-brand-name">Nombre</Label>
              <Input
                id="edit-brand-name"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                placeholder="Nombre de la brand"
              />
            </div>
            <div>
              <Label htmlFor="edit-brand-category">Categoría</Label>
              <Select
                value={newBrand.category}
                onValueChange={(value) => setNewBrand({ ...newBrand, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Galletas">Galletas</SelectItem>
                  <SelectItem value="Untables">Untables</SelectItem>
                  <SelectItem value="Bebidas">Bebidas</SelectItem>
                  <SelectItem value="Cereales">Cereales</SelectItem>
                  <SelectItem value="Lácteos">Lácteos</SelectItem>
                  <SelectItem value="Snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdateBrand} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" onClick={() => setIsEditBrandOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Chain Modal */}
      <Dialog open={isEditChainOpen} onOpenChange={setIsEditChainOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cadena</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-chain-name">Nombre</Label>
              <Input
                id="edit-chain-name"
                value={newChain.name}
                onChange={(e) => setNewChain({ ...newChain, name: e.target.value })}
                placeholder="Nombre de la cadena"
              />
            </div>
            <div>
              <Label htmlFor="edit-chain-stores">Número de tiendas</Label>
              <Input
                id="edit-chain-stores"
                type="number"
                value={newChain.storeCount}
                onChange={(e) => setNewChain({ ...newChain, storeCount: e.target.value })}
                placeholder="1000"
              />
            </div>
            <div>
              <Label htmlFor="edit-chain-regions">Regiones (separadas por comas)</Label>
              <Input
                id="edit-chain-regions"
                value={newChain.regions}
                onChange={(e) => setNewChain({ ...newChain, regions: e.target.value })}
                placeholder="Madrid, Barcelona, Valencia"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdateChain} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" onClick={() => setIsEditChainOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Supermarket Modal */}
      <Dialog open={isEditSupermarketOpen} onOpenChange={setIsEditSupermarketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Supermercado</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-supermarket-name">Nombre</Label>
              <Input
                id="edit-supermarket-name"
                value={newSupermarket.name}
                onChange={(e) => setNewSupermarket({ ...newSupermarket, name: e.target.value })}
                placeholder="Nombre del supermercado"
              />
            </div>
            <div>
              <Label htmlFor="edit-supermarket-chain">Cadena</Label>
              <Select
                value={newSupermarket.chain}
                onValueChange={(value) => setNewSupermarket({ ...newSupermarket, chain: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una cadena" />
                </SelectTrigger>
                <SelectContent>
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.name}>
                      {chain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-supermarket-address">Dirección</Label>
              <Input
                id="edit-supermarket-address"
                value={newSupermarket.address}
                onChange={(e) => setNewSupermarket({ ...newSupermarket, address: e.target.value })}
                placeholder="Dirección completa"
              />
            </div>
            <div>
              <Label htmlFor="edit-supermarket-city">Ciudad</Label>
              <Input
                id="edit-supermarket-city"
                value={newSupermarket.city}
                onChange={(e) => setNewSupermarket({ ...newSupermarket, city: e.target.value })}
                placeholder="Ciudad"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdateSupermarket} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" onClick={() => setIsEditSupermarketOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
