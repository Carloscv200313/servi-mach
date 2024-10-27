'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const steps = ['Datos Personales', 'Confirmación', 'Foto de Perfil']

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex justify-between mb-4">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`h-1 w-full ${i < currentStep - 1 ? 'bg-primary' : 'bg-muted'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export function RegistroPasoAPaso() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [registrationType, setRegistrationType] = useState<'usuario' | 'empleado'>('usuario')

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetForm = () => {
    setCurrentStep(0)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Ingrese su nombre completo" />
            </div>
            {registrationType === 'usuario' ? (
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input id="username" placeholder="Elija un nombre de usuario" />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="employeeId">ID de empleado</Label>
                <Input id="employeeId" placeholder="Ingrese su ID de empleado" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="Ingrese su correo electrónico" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="Elija una contraseña" />
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <p>Por favor, revise sus datos:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Nombre: [Nombre ingresado]</li>
              <li>{registrationType === 'usuario' ? 'Usuario: [Usuario ingresado]' : 'ID de empleado: [ID ingresado]'}</li>
              <li>Correo: [Correo ingresado]</li>
            </ul>
            <p>¿Está seguro de que todos los datos son correctos?</p>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Foto de perfil</Label>
              <Input id="profilePicture" type="file" accept="image/*" />
            </div>
            <p>Suba una foto de perfil (opcional)</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="loginUsername">Usuario</Label>
                <Input id="loginUsername" placeholder="Ingresa tu usuario" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="loginPassword">Contraseña</Label>
                <Input id="loginPassword" type="password" placeholder="Ingresa tu contraseña" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Iniciar sesión</Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button variant="outline">Crear cuenta</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear nueva cuenta</DialogTitle>
              </DialogHeader>
              <Tabs value={registrationType} onValueChange={(value) => setRegistrationType(value as 'usuario' | 'empleado')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="usuario">Usuario</TabsTrigger>
                  <TabsTrigger value="empleado">Empleado</TabsTrigger>
                </TabsList>
                <TabsContent value="usuario">
                  <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
                  <form className="space-y-4">
                    {renderStep()}
                    <div className="flex justify-between">
                      {currentStep > 0 && (
                        <Button type="button" variant="outline" onClick={handleBack}>
                          Atrás
                        </Button>
                      )}
                      {currentStep < steps.length - 1 ? (
                        <Button type="button" onClick={handleNext}>
                          Siguiente
                        </Button>
                      ) : (
                        <Button type="submit">Finalizar registro</Button>
                      )}
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="empleado">
                  <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
                  <form className="space-y-4">
                    {renderStep()}
                    <div className="flex justify-between">
                      {currentStep > 0 && (
                        <Button type="button" variant="outline" onClick={handleBack}>
                          Atrás
                        </Button>
                      )}
                      {currentStep < steps.length - 1 ? (
                        <Button type="button" onClick={handleNext}>
                          Siguiente
                        </Button>
                      ) : (
                        <Button type="submit">Finalizar registro</Button>
                      )}
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}