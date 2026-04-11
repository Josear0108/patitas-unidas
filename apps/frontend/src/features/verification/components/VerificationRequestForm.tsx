import { useState } from 'react'
import { Info, ShieldCheck } from 'lucide-react'
import { FoundationRequestCreateSchema } from '@patitas/types'
import type { FoundationRequestCreate } from '@patitas/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateRequest } from '../hooks/useVerification'

interface VerificationRequestFormProps {
  userEmail: string
}

type FormFields = {
  foundation_name: string
  country: string
  city: string
  contact_phone: string
  contact_email: string
  brief_description: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const INITIAL_FORM: FormFields = {
  foundation_name: '',
  country: 'Colombia',
  city: '',
  contact_phone: '',
  contact_email: '',
  brief_description: '',
}

const LATIN_AMERICA_COUNTRIES = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Ecuador',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'República Dominicana',
  'Uruguay',
  'Venezuela',
]

/**
 * Extrae el mensaje de error de un campo Zod formateado.
 * Retorna el primer mensaje del campo indicado, o undefined si no hay error.
 */
function extractFieldErrors(
  error: ReturnType<typeof FoundationRequestCreateSchema.safeParse> & { success: false },
): FormErrors {
  const errors: FormErrors = {}
  for (const issue of error.error.issues) {
    const field = issue.path[0] as keyof FormFields | undefined
    if (field && !errors[field]) {
      errors[field] = issue.message
    }
  }
  return errors
}

export function VerificationRequestForm({ userEmail }: VerificationRequestFormProps) {
  const { mutate: createRequest, isPending, error: mutationError } = useCreateRequest()

  const [form, setForm] = useState<FormFields>({
    ...INITIAL_FORM,
    contact_email: userEmail,
  })
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})

  function handleChange(field: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Limpiar el error del campo al escribir
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const parsed = FoundationRequestCreateSchema.safeParse(form)

    if (!parsed.success) {
      setFieldErrors(extractFieldErrors(parsed))
      return
    }

    setFieldErrors({})
    createRequest(parsed.data as FoundationRequestCreate)
  }

  const descriptionLength = form.brief_description.length

  const counterColor =
    descriptionLength === 0
      ? 'text-muted-foreground'
      : descriptionLength < 50
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-green-600 dark:text-green-400'

  return (
    <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Nombre de la fundación */}
        <div className="space-y-1.5">
          <Label htmlFor="foundation_name" className="text-xs font-semibold uppercase tracking-wide">
            Nombre de la fundación
          </Label>
          <Input
            id="foundation_name"
            value={form.foundation_name}
            onChange={(e) => handleChange('foundation_name', e.target.value)}
            placeholder="Ej. Fundación Huellas de Amor"
            aria-invalid={!!fieldErrors.foundation_name}
            aria-describedby={fieldErrors.foundation_name ? 'foundation_name-error' : undefined}
          />
          {fieldErrors.foundation_name && (
            <p id="foundation_name-error" className="text-xs text-destructive">
              {fieldErrors.foundation_name}
            </p>
          )}
        </div>

        {/* País + Ciudad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="country" className="text-xs font-semibold uppercase tracking-wide">
              País
            </Label>
            <Select
              value={form.country}
              onValueChange={(value) => handleChange('country', value)}
            >
              <SelectTrigger id="country" className="w-full" aria-invalid={!!fieldErrors.country}>
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                {LATIN_AMERICA_COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.country && (
              <p className="text-xs text-destructive">{fieldErrors.country}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide">
              Ciudad
            </Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Ej. Bogotá"
              aria-invalid={!!fieldErrors.city}
              aria-describedby={fieldErrors.city ? 'city-error' : undefined}
            />
            {fieldErrors.city && (
              <p id="city-error" className="text-xs text-destructive">
                {fieldErrors.city}
              </p>
            )}
          </div>
        </div>

        {/* Teléfono + Correo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="contact_phone" className="text-xs font-semibold uppercase tracking-wide">
              Teléfono de contacto
            </Label>
            <Input
              id="contact_phone"
              type="tel"
              inputMode="numeric"
              value={form.contact_phone}
              onChange={(e) => handleChange('contact_phone', e.target.value)}
              placeholder="Ej. 3001234567"
              aria-invalid={!!fieldErrors.contact_phone}
              aria-describedby={fieldErrors.contact_phone ? 'contact_phone-error' : undefined}
            />
            {fieldErrors.contact_phone && (
              <p id="contact_phone-error" className="text-xs text-destructive">
                {fieldErrors.contact_phone}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact_email" className="text-xs font-semibold uppercase tracking-wide">
              Correo electrónico
            </Label>
            <Input
              id="contact_email"
              type="email"
              value={form.contact_email}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              placeholder="contacto@fundacion.org"
              aria-invalid={!!fieldErrors.contact_email}
              aria-describedby={fieldErrors.contact_email ? 'contact_email-error' : undefined}
            />
            {fieldErrors.contact_email && (
              <p id="contact_email-error" className="text-xs text-destructive">
                {fieldErrors.contact_email}
              </p>
            )}
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Info className="h-3 w-3 shrink-0" />
              Prellenado desde tu cuenta de Google
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-1.5">
          <Label htmlFor="brief_description" className="text-xs font-semibold uppercase tracking-wide">
            Breve descripción
          </Label>
          <Textarea
            id="brief_description"
            value={form.brief_description}
            onChange={(e) => handleChange('brief_description', e.target.value)}
            placeholder="Cuéntanos sobre tu fundación, los animales que cuidan y su impacto en la comunidad..."
            rows={5}
            maxLength={500}
            aria-invalid={!!fieldErrors.brief_description}
            aria-describedby="brief_description-hint"
            className="resize-none"
          />
          <p
            id="brief_description-hint"
            className={`text-xs ${fieldErrors.brief_description ? 'text-destructive' : counterColor}`}
          >
            {fieldErrors.brief_description ? (
              fieldErrors.brief_description
            ) : (
              <>
                {descriptionLength}/500
                {descriptionLength < 50 && (
                  <span> · mínimo 50</span>
                )}
              </>
            )}
          </p>
        </div>

        {/* Error de mutación (e.g. error de red) */}
        {mutationError && (
          <p className="text-sm text-destructive" role="alert">
            {mutationError instanceof Error
              ? mutationError.message
              : 'Ocurrió un error al enviar la solicitud. Intenta nuevamente.'}
          </p>
        )}

        <div className="space-y-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Enviando solicitud...' : 'Verificar mi fundación'}
          </Button>

          {/* Nota de privacidad — trust signal junto al CTA */}
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            Tus datos están protegidos por nuestra política de privacidad
          </p>
        </div>
      </form>
    </div>
  )
}
