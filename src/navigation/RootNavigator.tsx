import { MainNavigator } from "@/navigation/MainNavigator"
import { AuthNavigator } from "@/navigation/AuthNavigator"
import { useAuthStore } from "@/store/authStore"

export const RootNavigator = ()=>{
    const {isAuthenticated} = useAuthStore((state)=> state)

    return isAuthenticated ?  <MainNavigator/> : <AuthNavigator/>
}