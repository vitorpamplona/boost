import React, { FunctionComponent } from "react"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import { useTranslation } from "react-i18next"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"

import VaccinationHistoryScreen from "../VaccinationHistory/"
import { Stacks, VaccinationHistoryStackScreens } from "./index"
import { applyModalHeader } from "./ModalHeader"
import { VaccinationEntry } from "../VaccinationHistory/symptomHistory"
import CovidRecommendation from "../CovidRecommendation"
import CallEmergencyServices from "../CallEmergencyServices"

export type VaccinationHistoryStackParams = {
  VaccinationHistory: undefined
  AtRiskRecommendation: undefined
}

const Stack = createStackNavigator<VaccinationHistoryStackParams>()

const VaccinationHistoryStack: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name={VaccinationHistoryStackScreens.VaccinationHistory}
        component={VaccinationHistoryScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  )
}


export default VaccinationHistoryStack
