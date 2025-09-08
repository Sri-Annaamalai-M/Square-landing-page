import React, { useState } from "react";
import { cn } from "../../lib/utils";
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
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="group flex flex-col w-full max-w-[480px] mx-auto items-start p-4 md:p-5 bg-white rounded-3xl overflow-hidden shadow-[0px_2px_16px_#10182814] border-0 h-full hover:shadow-xl transition-shadow duration-300">
      <CardContent className="flex flex-col items-start gap-6 w-full p-0 h-full">
        {useCase.image ? (
          <div
            className="w-full h-[150px] md:h-[197px] bg-[#e6edfc] rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${useCase.image})` }}
          />
        ) : (
          <div className="w-full h-[150px] md:h-[197px] bg-[#e6edfc] rounded-3xl" />
        )}

        <div className="flex flex-col w-full items-start gap-4 md:gap-[18px] flex-grow">
          <div className="flex flex-col items-start gap-3 w-full">
            <h2 className=" font-semibold text-black text-[20px] tracking-0 leading-normal">
              {useCase.title}
            </h2>

            <div className="font-inter font-normal text-[#303030] text-[14px] tracking-0 leading-normal">
              <p className={`${isExpanded ? '' : 'line-clamp-3'} transition-all duration-300`}>
                {useCase.tagline}
              </p>
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
        </div>

        {/* Learn More Button - Now at bottom */}
        <div className="w-full mt-auto">
          <Button
            variant="link"
            onClick={() => onLearnMore(useCase.id)}
            className="font-inter font-normal text-[#3e57da] text-base md:text-[16px] tracking-0 leading-normal p-0 h-auto justify-start opacity-0 transition-all duration-300 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 no-underline hover:no-underline cursor-pointer"
          >
            Learn More
            <img src="/images/img_solar_arrow_up_linear.svg" alt="Arrow" className="w-2 h-2 xs:w-3 xs:h-3 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseCard;