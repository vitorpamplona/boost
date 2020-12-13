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
import { posixToDayjs } from "../../utils/dateTime"

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

const VaccineCard: FunctionComponent = (props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const handleOnPressShowQRCode = () => {
    console.log(props);
    navigation.navigate(VaccinationHistoryStackScreens.QRViewerScreen, {qr_code:props.qr_code} )
  }

  const dayJsDate = posixToDayjs(props.date);
  const dateText = dayJsDate?.local().format("MMM D, YYYY");

  const dayJsDateNext = posixToDayjs(props.nextDose);
  const dateNextText = dayJsDateNext?.local().format("MMM D, YYYY");

  return (
    <TouchableOpacity
      onPress={handleOnPressShowQRCode}
      style={style.floatingContainer}
    >
      <View style={style.cardTopContainer}>
        <Text style={style.sectionHeaderText}>{props.manufacturer} {props.name}</Text>
        <SvgXml
            xml={Icons.Syringe}
            fill={Colors.primary.shade125}
            width={Iconography.xSmall}
            height={Iconography.xSmall}
        />
      </View>
      
      <Text style={style.sectionSubHeaderText}>DOSE {props.doseSequence} OF {props.requiredDoses}</Text>
      <Text style={style.sectionBodyText}>Vaccinated: <Text style={style.bold}>{dateText}</Text></Text>
      <Text style={style.sectionBodyText}>Location: <Text style={style.bold}>{props.vaccinator}</Text></Text>
      {props.nextDose ? <Text style={style.sectionBodyText}>Next Dose on: <Text style={style.bold}>{dateNextText}</Text></Text> 
                      : <Text style={style.sectionBodyText}>All Doses <Text style={style.bold}>Completed!</Text></Text>}
      
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