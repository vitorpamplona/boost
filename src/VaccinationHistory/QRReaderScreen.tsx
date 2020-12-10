import React, { FunctionComponent } from "react"
import {
  Dimensions, View, StyleSheet
} from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"
import { StatusBar } from "../components"

import QRCodeScanner from 'react-native-qrcode-scanner';
import { Stacks } from "../navigation"

import { Buttons, Colors, Spacing, Typography } from "../styles"

import { useStatusBarEffect } from "../navigation"
import { Text } from "../components"

const screenHeight = Math.round(Dimensions.get('window').height);

const QRReaderScreen: FunctionComponent = () => {
  useStatusBarEffect("dark-content", Colors.background.primaryLight)
  const { t } = useTranslation()
  const navigation = useNavigation()
  
  const onVaccineRead = () => {
    navigation.navigate(Stacks.Home)
  }

  return (
    <View style={style.outerContainer}>
      <StatusBar backgroundColor={Colors.background.primaryLight} />
      <QRCodeScanner
        onRead={onVaccineRead}
        reactivate={true}
        reactivateTimeout={5000}
        cameraStyle={{ height: screenHeight }}
        topViewStyle={{height: 0, flex: 0}}
        bottomViewStyle={{height: 0, flex: 0}}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primaryLight,
  },
})

export default QRReaderScreen
