
type TransitionOptions = {
  duration?: number;
  delay?: number;
  ease?: string;
};

export const createTransition = (
  properties: string | string[] = "all",
  options: TransitionOptions = {}
): string => {
  const { duration = 300, delay = 0, ease = "cubic-bezier(0.4, 0, 0.2, 1)" } = options;
  
  const props = Array.isArray(properties) ? properties.join(", ") : properties;
  
  return `${props} ${duration}ms ${ease} ${delay}ms`;
};

export const transitions = {
  default: createTransition("all"),
  fast: createTransition("all", { duration: 150 }),
  slow: createTransition("all", { duration: 500 }),
  
  transform: createTransition(["transform", "opacity"]),
  opacity: createTransition("opacity", { duration: 200 }),
  
  scale: createTransition("transform", { duration: 200 }),
  slide: createTransition(["transform", "opacity"], { duration: 300 }),
  
  // Complex multi-property transitions
  card: createTransition(
    ["transform", "box-shadow", "background-color"],
    { duration: 250 }
  ),
  
  button: createTransition(
    ["background-color", "color", "border-color", "transform"],
    { duration: 200 }
  ),
  
  // Staggered animations helper
  getStaggerDelay: (index: number, baseDelay = 50): number => baseDelay * index
};

// This object stores CSS classes that can be applied directly in className props
export const transitionClasses = {
  hover: "transition-all duration-300 ease-in-out",
  scale: "transition-transform duration-200 ease-out",
  fade: "transition-opacity duration-200 ease-in-out",
  slide: "transition-all duration-300 ease-out",
  smooth: "transition-all duration-500 ease-in-out"
};
