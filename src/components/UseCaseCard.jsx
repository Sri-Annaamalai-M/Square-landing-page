import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Card components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const UseCaseCard = ({ useCase, onLearnMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className={`flex flex-col w-full max-w-[480px] mx-auto items-start p-4 md:p-5 bg-white rounded-3xl overflow-hidden border-0 transition-all duration-300 ease-out cursor-pointer group ${
        isHovered 
          ? 'shadow-[0px_20px_40px_rgba(16,24,40,0.25)] transform -translate-y-2 scale-[1.02] ring-2 ring-blue-200 ring-opacity-50' 
          : 'shadow-[0px_2px_16px_#10182814] hover:shadow-[0px_12px_32px_rgba(16,24,40,0.15)]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="flex flex-col items-start gap-6 w-full p-0">
        {useCase.image ? (
          <div
            className={`w-full h-[150px] md:h-[197px] bg-[#e6edfc] rounded-3xl bg-cover bg-center transition-all duration-300 ${
              isHovered ? 'transform scale-105' : ''
            }`}
            style={{ backgroundImage: `url(${useCase.image})` }}
          />
        ) : (
          <div className={`w-full h-[150px] md:h-[197px] bg-[#e6edfc] rounded-3xl transition-all duration-300 ${
            isHovered ? 'transform scale-105' : ''
          }`} />
        )}

        <div className="flex flex-col w-full items-start gap-4 md:gap-[18px]">
          <div className="flex flex-col items-start gap-3 w-full">
            <div className={`font-sora font-semibold text-black text-[22px] tracking-0 leading-normal transition-colors duration-300 ${
              isHovered ? 'text-[#064EE3]' : ''
            }`}>
              {useCase.title}
            </div>

            <div className="font-inter font-normal text-[#303030] text-[22px] tracking-0 leading-normal">
              <div className={`${isExpanded ? '' : 'line-clamp-3'} transition-all duration-300`}>
                {useCase.tagline}
              </div>
              {useCase.tagline && useCase.tagline.length > 120 && (
                <button
                  onClick={toggleExpanded}
                  className="text-[#3E57DA] hover:underline mt-1 text-sm"
                >
                  {isExpanded ? 'Show less' : 'Show more...'}
                </button>
              )}
            </div>
          </div>

          <Button
            variant="link"
            onClick={() => onLearnMore(useCase.id)}
            className={`font-inter font-normal text-base md:text-[22px] tracking-0 leading-normal p-0 h-auto justify-start transition-all duration-300 ${
              isHovered ? 'text-[#064EE3] transform translate-x-2' : 'text-[#3e57da]'
            }`}
          >
            Learn More →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseCard;
