"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
import CustomLink from "./custom-link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react"
import { Button } from "@/components/ui/button"

export default function MainNav() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-w-full tw-p-2 md:tw-p-3">
      <div className="tw-flex tw-justify-between tw-w-full md:tw-w-auto">
        <CustomLink href="/">
          <Button variant="ghost" className="tw-p-0">
            <Image
              src="https://www.42network.org/wp-content/uploads/2024/04/42.svg"
              alt="Home"
              width="34"
              height="32"
              className="tw-min-w-8"
            />
          </Button>
        </CustomLink>
        <div className="md:tw-hidden">
          <Button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="tw-w-6 tw-h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
      <NavigationMenu
        className={`tw-flex-grow tw-w-full md:tw-w-auto md:tw-flex ${
          menuOpen ? "tw-block" : "tw-hidden"
        } md:tw-flex`}
      >
        <NavigationMenuList className="tw-flex tw-flex-col md:tw-flex-row tw-justify-end tw-w-full md:tw-w-auto">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={`${navigationMenuTriggerStyle()} tw-bg-primary`}
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/project"
              className={`${navigationMenuTriggerStyle()} tw-bg-primary`}
            >
              Restaurant inspection
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/project/old"
              className={`${navigationMenuTriggerStyle()} tw-bg-primary`}
            >
              Traditinal Delivery
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/project/main"
              className={`${navigationMenuTriggerStyle()} tw-bg-primary`}
            >
              Bucket Delivery 
            </NavigationMenuLink>
          </NavigationMenuItem>
          {menuOpen && (
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#developers"
                className={`${navigationMenuTriggerStyle()} tw-bg-primary`}
                >
                Developers
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <Button
        onClick={() => {
          location.href = '/#developers'
        }}
        variant="ghost"
        className={`tw-mt-2 md:tw-mt-0 sm:tw-hidden md:tw-block min-[10px]:tw-hidden`}
      >
        Developers
      </Button>
    </div>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "tw-block tw-select-none tw-space-y-1 tw-rounded-md tw-p-3 tw-leading-none tw-no-underline tw-outline-none tw-transition-colors hover:tw-bg-accent hover:tw-text-accent-foreground focus:tw-bg-accent focus:tw-text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="tw-text-sm tw-font-medium tw-leading-none">{title}</div>
          <p className="tw-text-sm tw-leading-snug tw-line-clamp-2 tw-text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
