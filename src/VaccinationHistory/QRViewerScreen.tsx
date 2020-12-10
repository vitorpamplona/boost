import React, { FunctionComponent, useEffect } from "react"
import {
  Dimensions, View, StyleSheet
} from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"
import { StatusBar } from "../components"

import QRCode from 'react-native-qrcode-svg';

import { Stacks } from "../navigation"

import { Buttons, Colors, Spacing, Typography } from "../styles"

import { useStatusBarEffect } from "../navigation"

import { Text } from "../components"

const size = Math.min(Math.round(Dimensions.get('window').height), Math.round(Dimensions.get('window').width)) - 40;
const demoValue = "healthpass:SHA256\c6u5mY6KTFDc8apt+7GUHvYOKgsn/4dvT8ME3quubFEgUvzkwLyjktM0I9ec\n" +
                  "YlIwkhP9D8UzOXlGdoN4G7L3lD9i1Z/ewOUR0+mhtcJfg2E7tvnJs7LlyB4q\n" +
                  "LPGmJZZamfj1XD0PPbbFuCSc8oNiAZJyk5WgmfSpT1rI1cssVuI=\n" +
                  "@healthpassport-api.vitorpamplona.com/u/7/pub_key?date=2020-12-10&vaccinee=Vitor+Pamplona&vaccinator=CVS+Minute+Clinics+Station&manuf=Moderna+Vaccine&name=COVID19&route=Intramuscular&lot=&dose=1"
  

const QRViewerScreen: FunctionComponent = () => {
  useStatusBarEffect("dark-content", Colors.background.primaryLight)
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleOnPress = () => {
    navigation.goBack()
  }

  let logoFromFile = require('../assets/images/pcf.png');

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Moderna Vaccine, 1 of 2 doses' })
  });

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={Colors.background.primaryLight} />
      <QRCode
        size={size}
        color={Colors.primary.shade100}
        value={demoValue}
        logo={logoFromFile}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.background.primaryLight,
    justifyContent: 'center', 
    alignItems: 'center'
  },
})

export default QRViewerScreen
