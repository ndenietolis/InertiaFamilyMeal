import * as React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type SearchSelectProps<T> = {
  id?: string
  items: T[]
  placeholder?: string
  emptyMessage?: string
  disabled?: boolean
  selectedItemId?: number | string | null
  getItemId: (item: T) => number | string
  getItemLabel: (item: T) => string
  getItemDescription?: (item: T) => string | null | undefined
  onSelect: (item: T) => void
}

export function SearchSelect<T>({
  id,
  items,
  placeholder = 'Search...',
  emptyMessage = 'No matching results found.',
  disabled = false,
  selectedItemId = null,
  getItemId,
  getItemLabel,
  getItemDescription,
  onSelect,
}: SearchSelectProps<T>) {
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  const filteredItems = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return items

    return items.filter((item) => {
      const label = getItemLabel(item).toLowerCase()
      const description = getItemDescription?.(item)?.toLowerCase() ?? ''
      return `${label} ${description}`.includes(normalizedQuery)
    })
  }, [getItemDescription, getItemLabel, items, query])

  const handleSelect = (item: T) => {
    onSelect(item)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <Input
        id={id}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="border-slate-300 bg-white"
        disabled={disabled}
      />

      {open ? (
        <div className="absolute top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const itemId = getItemId(item)
              const description = getItemDescription?.(item)

              return (
                <button
                  key={itemId}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(item)}
                  disabled={disabled}
                  className={cn(
                    'flex w-full items-start justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-slate-100',
                    selectedItemId === itemId && 'bg-slate-100'
                  )}
                >
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900">{getItemLabel(item)}</div>
                    {description ? (
                      <div className="truncate text-slate-500">{description}</div>
                    ) : null}
                  </div>
                </button>
              )
            })
          ) : (
            <div className="px-3 py-6 text-sm text-slate-500">{emptyMessage}</div>
          )}
        </div>
      ) : null}
    </div>
  )
}
