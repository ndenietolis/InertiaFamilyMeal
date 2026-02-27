import { cn } from "@/lib/utils"

export function TypographyH1({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  )
}

export function TypographyH2({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {children}
    </h2>
  )
}

export function TypographyBody1({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <p className={cn("", className)}>
      {children}
    </p>
  )
}

export function TypographyP({ className, children }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("leading-7 not-first:mt-6", className)}>
      {children}
    </p>
  )
}

export function TypographyMuted({ className, children }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  )
}