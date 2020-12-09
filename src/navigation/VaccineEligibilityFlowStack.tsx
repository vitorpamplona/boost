import React, { FunctionComponent } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { VaccineEligibilityProvider } from "../VaccineEligibilityFlow/VaccineEligibilityContext"
import Start from "../VaccineEligibilityFlow/Start"
import CodeInput from "../VaccineEligibilityFlow/CodeInput/CodeInputScreen"
import Complete from "../VaccineEligibilityFlow/Complete"
import PublishConsent from "../VaccineEligibilityFlow/PublishConsent/PublishConsentScreen"
import VaccineEligibilityCodeInfo from "../VaccineEligibilityFlow/VaccineEligibilityCodeInfo"
import { VaccineEligibilityFlowStackScreens } from "."
import { applyHeaderLeftBackButton } from "./HeaderLeftBackButton"
import { useOnboardingContext } from "../OnboardingContext"

import { Headers } from "../styles"

export type VaccineEligibilityFlowStackParamList = {
  VaccineEligibilityStart: undefined
  VaccineEligibilityCodeInfo: undefined
  VaccineEligibilityCodeInput: { code?: string; c?: string }
  VaccineEligibilityComplete: undefined
}

const Stack = createStackNavigator<VaccineEligibilityFlowStackParamList>()
      
const VaccineEligibilityStack: FunctionComponent = () => {
  const { isOnboardingComplete } = useOnboardingContext()

  return (
    <VaccineEligibilityProvider isOnboardingComplete={isOnboardingComplete}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen
          name={VaccineEligibilityFlowStackScreens.VaccineEligibilityStart}
          component={Start}
          options={{
            ...Headers.headerMinimalOptions,
            headerLeft: applyHeaderLeftBackButton(),
          }}
        />
        <Stack.Screen
          name={VaccineEligibilityFlowStackScreens.VaccineEligibilityCodeInfo}
          component={VaccineEligibilityCodeInfo}
          options={{
            ...Headers.headerMinimalOptions,
            headerLeft: applyHeaderLeftBackButton(),
          }}
        />
        <Stack.Screen
          name={VaccineEligibilityFlowStackScreens.VaccineEligibilityCodeInput}
          component={CodeInput}
          options={{
            ...Headers.headerMinimalOptions,
            headerLeft: applyHeaderLeftBackButton(),
          }}
        />
        <Stack.Screen
          name={VaccineEligibilityFlowStackScreens.VaccineEligibilityComplete}
          component={Complete}
        />
      </Stack.Navigator>
    </VaccineEligibilityProvider>
  )
}

export default VaccineEligibilityStack
