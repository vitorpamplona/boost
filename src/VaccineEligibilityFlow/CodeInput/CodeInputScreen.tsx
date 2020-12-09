import React, { FunctionComponent } from "react"
import { View, StyleSheet } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import CodeInputForm from "./CodeInputForm"
import { applyHeaderLeftBackButton } from "../../navigation/HeaderLeftBackButton"
import { useVaccineEligibilityContext } from "../VaccineEligibilityContext"
import { VaccineEligibilityFlowStackParamList } from "../../navigation/VaccineEligibilityFlowStack"

import { Colors } from "../../styles"

type CodeInputScreenRouteProp = RouteProp<
  VaccineEligibilityFlowStackParamList,
  "VaccineEligibilityCodeInput"
>

const CodeInputScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const route = useRoute<CodeInputScreenRouteProp>()
  const { navigateOutOfStack, setLinkCode } = useVaccineEligibilityContext()

  const linkCode: string | undefined = route?.params?.c || route?.params?.code

  if (linkCode) {
    setLinkCode(linkCode)
    navigation.setOptions({
      headerLeft: applyHeaderLeftBackButton(navigateOutOfStack),
    })
  }

  return (
    <View style={style.container}>
      <CodeInputForm linkCode={linkCode} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primaryLight,
  },
})

export default CodeInputScreen
