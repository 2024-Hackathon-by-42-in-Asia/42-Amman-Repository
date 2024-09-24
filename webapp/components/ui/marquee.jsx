import { ny } from '@/lib/utils'

export default function Marquee({
   className,
   reverse,
   pauseOnHover = false,
   children,
   vertical = false,
   repeat = 4,
   ...props
}) {
   return (
      (<div
         {...props}
         className={ny(
            "tw-'group tw-flex tw-overflow-hidden tw-p-2 [--duration:tw-40s] [--gap:tw-1rem] [gap:tw-var(--gap)]'",
            {
               'flex-row': !vertical,
               'flex-col': vertical,
            },
            className
         )}>
         {Array(repeat)
            .fill(0)
            .map((_, i) => (
               <div
                  key={i}
                  className={ny("tw-'flex tw-shrink-0 tw-justify-around [gap:tw-var(--gap)]'", {
                     'animate-marquee flex-row': !vertical,
                     'animate-marquee-vertical flex-col': vertical,
                     'group-hover:[animation-play-state:paused]': pauseOnHover,
                     '[animation-direction:reverse]': reverse,
                  })}>
                  {children}
               </div>
            ))}
      </div>)
   );
}
