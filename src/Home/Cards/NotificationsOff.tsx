import React, { FunctionComponent } from "react"
import { View, TouchableOpacity, StyleSheet, Image, Text, Pressable, Linking } from "react-native"
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
  Outlines 
} from "../../styles"

import { usePermissionsContext } from "../../Device/PermissionsContext"

const NotificationsOff = () => {
  const { t } = useTranslation()
  const { notification } = usePermissionsContext()

  const handleOnPressNotificationsOff = () => {
    if (notification.status === "Denied") {
      notification.request()
    } else if (notification.status === "Blocked") {
      Linking.openSettings()
    }
  }

  const showNotificationsOff = notification.status !== "Granted"

  return showNotificationsOff ? (
    <Pressable
      style={style.notificationsOffContainer}
      onPress={handleOnPressNotificationsOff}
    >
      <View style={style.notificationsOffBellIconContainer}>
        <SvgXml
          xml={Icons.Bell}
          fill={Colors.neutral.shade100}
          width={Iconography.xxSmall}
          height={Iconography.xxSmall}
        />
      </View>
      <Text style={style.notificationsOffText}>
        {t("home.notifications_off")}
      </Text>
    </Pressable>
  ) : null
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
  notificationsOffContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.xSmall,
    paddingHorizontal: Spacing.small,
    marginBottom: Spacing.small,
    borderWidth: Outlines.thin,
    borderColor: Colors.neutral.shade75,
    backgroundColor: Colors.neutral.shade5,
    borderRadius: Outlines.borderRadiusLarge,
  },
  notificationsOffBellIconContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  notificationsOffText: {
    flex: 9,
    ...Typography.body.x20,
    color: Colors.neutral.black,
  },
  bold: {
    fontWeight: "bold"
  }
})

export default NotificationsOff