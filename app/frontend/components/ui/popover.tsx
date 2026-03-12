import * as React from "react"
import { Popover } from "radix-ui"

import { cn } from "@/lib/utils"

function PopoverRoot(props: React.ComponentProps<typeof Popover.Root>) {
  return <Popover.Root data-slot="popover" {...props} />
}

function PopoverTrigger(props: React.ComponentProps<typeof Popover.Trigger>) {
  return <Popover.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverAnchor(props: React.ComponentProps<typeof Popover.Anchor>) {
  return <Popover.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof Popover.Content>) {
  return (
    <Popover.Portal>
      <Popover.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-2 shadow-md outline-none",
          className
        )}
        {...props}
      />
    </Popover.Portal>
  )
}

export {
  PopoverRoot as Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
}
