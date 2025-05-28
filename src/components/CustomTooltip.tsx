import { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const CustomTooltip = ({ children, content }: { children: ReactNode, content: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
            <TooltipTrigger asChild>
              {children}
            </TooltipTrigger>
            <TooltipContent>
              <p>{content}</p>
            </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip