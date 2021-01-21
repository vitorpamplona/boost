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
    navigation.navigate(VaccinationHistoryStackScreens.QRReaderScreen, {eligibilityCode:props.eligibilityCode})
  }

  function nth(n){return n+["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

  const dayJsDate = posixToDayjs(props.date);
  const dateText = dayJsDate?.local().format("MMM D, YYYY h:mma");

  // Date: <Text style={style.bold}>{dateText}</Text>

  return (
    <TouchableOpacity
      onPress={handleOnPressShowQRCode}
      style={style.floatingContainer}
    >
      <View style={style.cardTopContainer}>
        <Text style={style.sectionHeaderText}>Vaccine Coupon</Text>
        <SvgXml
            xml={Icons.DoctorAppointment}
            fill={Colors.primary.shade125}
            width={Iconography.xSmall}
            height={Iconography.xSmall}
        />
      </View>
      
      <Text style={style.sectionSubHeaderText}>Waiting Location Confirmation</Text>
      <Text style={style.sectionBodyText}>Date: <Text style={style.bold}>Awaiting Confirmation</Text></Text>
      <Text style={style.sectionBodyText}>Vaccine: <Text style={style.bold}>{props.manufacturer}, {nth(props.doseSequence)} dose</Text></Text>
      
      <View style={style.cardBottomContainer}>
        <SvgXml
            xml={Icons.CheckmarkCircle}
            fill={Colors.primary.shade125}
            width={Iconography.xSmall}
            height={Iconography.xSmall}
            style={style.sameLineSpacer}
        />
        <Text style={style.sectionBodyText}>Eligibility Code has been verified</Text>
      </View>
      <SectionButton text={t("appointment_card.record_vaccination")} />
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
    marginBottom: Spacing.xSmall,
    alignItems: "center",
  },
  sameLineSpacer: {
    marginRight: Spacing.xSmall,
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