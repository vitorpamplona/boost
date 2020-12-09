import React, {
  FunctionComponent,
  createContext,
  useState,
  useContext,
} from "react"
import { CommonActions, useNavigation } from "@react-navigation/native"

import { Stacks, WelcomeStackScreens } from "../navigation"

export interface VaccineEligibilityContextState {
  navigateOutOfStack: () => void
  linkCode: string | undefined
  setLinkCode: (linkCode: string | undefined) => void
}

interface VaccineEligibilityProviderProps {
  isOnboardingComplete: boolean
}

export const VaccineEligibilityContext = createContext<
  VaccineEligibilityContextState | undefined
>(undefined)

export const VaccineEligibilityProvider: FunctionComponent<VaccineEligibilityProviderProps> = ({
  children,
  isOnboardingComplete,
}) => {
  const navigation = useNavigation()

  const [linkCode, setLinkCode] = useState<string | undefined>(undefined)

  const navigateOutOfStack = () => {
    if (linkCode) {
      const route = isOnboardingComplete ? "App" : WelcomeStackScreens.Welcome
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: route }],
        }),
      )
    } else {
      navigation.navigate(Stacks.Home)
    }
  }

  return (
    <VaccineEligibilityContext.Provider
      value={{
        navigateOutOfStack,
        linkCode,
        setLinkCode,
      }}
    >
      {children}
    </VaccineEligibilityContext.Provider>
  )
}

export const useVaccineEligibilityContext = (): VaccineEligibilityContextState => {
  const context = useContext(VaccineEligibilityContext)
  if (context === undefined) {
    throw new Error("VaccineEligibilityContext must be used with a provider")
  }
  return context
}
