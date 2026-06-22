import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { ViewStyle } from "react-native"

export const getScreenContainerStyles = (
  backgroundColor:string = colors.neutral.white,
  padded:boolean = false,
):ViewStyle=>{
  return {
    flex:1,
    backgroundColor,
    ...(padded && { paddingHorizontal: spacing.md }),
  }
}