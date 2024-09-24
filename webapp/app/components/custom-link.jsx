'use client'
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

const CustomLink = ({
  href,
  children,
  className,
  ...rest
}) => {
  const isInternalLink = href.startsWith("/")
  const isAnchorLink = href.startsWith("#")

  if (isInternalLink || isAnchorLink) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "tw-inline-flex tw-align-baseline tw-gap-1 tw-items-center tw-underline tw-underline-offset-4",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      <ExternalLink className="tw-inline-block tw-ml-0.5 tw-w-4 tw-h-4" />
    </Link>
  )
}

export default CustomLink