import { cn } from '../../lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'

function SettingsCard({ icon, title, description, actions, children, className }) {
  return (
    <Card className={cn('rounded-xl border border-gray-200 bg-white shadow-sm', className)}>
      <CardHeader className="space-y-2 p-8 pb-0">
        <div className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 items-center gap-3.5">
            {icon ? <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-500">{icon}</div> : null}
            <div className="min-w-0">
              <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
              {description ? <CardDescription className="mt-2 text-sm text-gray-500">{description}</CardDescription> : null}
            </div>
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-8 pt-6">{children}</CardContent>
    </Card>
  )
}

function SettingsField({ label, htmlFor, helperText, children, className }) {
  return (
    <div className={cn('space-y-2.5', className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      {children}
      {helperText ? <p className="text-xs leading-5 text-gray-500">{helperText}</p> : null}
    </div>
  )
}

function SettingsActions({ children, className }) {
  return <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-center', className)}>{children}</div>
}

export { SettingsCard, SettingsField, SettingsActions }
