type ClassValue = string | number | boolean | null | undefined;

/**
 * Lightweight className combiner (no external dependency needed).
 * Usage: cn("base-class", condition && "conditional-class")
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
