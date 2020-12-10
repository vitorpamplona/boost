import React, { FunctionComponent } from "react"
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import {
  ModalStackScreens,
  VaccinationHistoryStackScreens,
  useStatusBarEffect,
} from "../../navigation"

import SectionButton from "./../SectionButton"

import { Icons, Images } from "../../assets"
import {
  Spacing,
  Colors,
  Typography,
  Affordances,
  Iconography,
  Buttons,
} from "../../styles"

const IMAGE_HEIGHT = 170

const VaccineCard: FunctionComponent = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const handleOnPressShowQRCode = () => {
    navigation.navigate(VaccinationHistoryStackScreens.QRViewerScreen)
  }

  return (
    <TouchableOpacity
      onPress={handleOnPressShowQRCode}
      style={style.floatingContainer}
    >
      <View style={style.cardTopContainer}>
        <Text style={style.sectionHeaderText}>Moderna Vaccine</Text>
        <SvgXml
            xml={Icons.Syringe}
            fill={Colors.primary.shade125}
            width={Iconography.xSmall}
            height={Iconography.xSmall}
        />
      </View>
      
      <Text style={style.sectionSubHeaderText}>DOSE 1 OF 2</Text>
      <Text style={style.sectionBodyText}>Vaccinated: <Text style={style.bold}>Dec 4, 2020</Text></Text>
      <Text style={style.sectionBodyText}>Location: <Text style={style.bold}>Parship Health</Text></Text>
      <Text style={style.sectionBodyText}>Next Dose on: <Text style={style.bold}>Dec 30, 2020</Text></Text>
      
      <View style={style.cardBottomContainer}>
        <SvgXml
            xml={Icons.CheckmarkCircle}
            fill={Colors.primary.shade125}
            width={Iconography.xSmall}
            height={Iconography.xSmall}
        />
        <Text style={style.sectionBodyText}>   </Text>
        <Text style={style.sectionBodyText}>{t("vaccine_card.fda_approved")}</Text>
      </View>
    </TouchableOpacity>
  )
}


const style = StyleSheet.create({
  floatingContainer: {
    ...Affordances.floatingContainer,
  },
  cardTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xxxSmall,
  },
  cardBottomContainer: {
    flexDirection: "row",
    marginTop: Spacing.xSmall,
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    marginBottom: Spacing.small,
  },
  moreInfoButton: {
    ...Buttons.circle.base,
  },
  sectionHeaderText: {
    ...Typography.header.x50,
    color: Colors.neutral.black
  },
  sectionSubHeaderText: {
    ...Typography.header.x30,
    color: Colors.neutral.black,
    marginBottom: Spacing.xxSmall,
  },
  sectionBodyText: {
    ...Typography.header.x20,
    ...Typography.style.normal,
    lineHeight: Typography.lineHeight.x40,
    color: Colors.neutral.shade100,
    marginBottom: Spacing.xxxSmall,
  }, 
  bold: {
    fontWeight: "bold"
  }
})

export default VaccineCard