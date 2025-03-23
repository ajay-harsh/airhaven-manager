
// Importing from the standard shadcn location
import { useToast as useToastOriginal } from "@/components/ui/toast"

// Re-export to maintain compatibility
export const useToast = useToastOriginal
export { toast } from "@/components/ui/toast"
