import React, { FunctionComponent } from "react"
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"

import { Text, StatusBar } from "../../components"
import { useStatusBarEffect } from "../../navigation"
import { useRequestExposureNotifications } from "../../useRequestExposureNotifications"

import { Spacing, Colors, Typography, Buttons } from "../../styles"

const EnableExposureNotifications: FunctionComponent = () => {
  useStatusBarEffect("dark-content", Colors.background.primaryLight)
  const { t } = useTranslation()
  const requestExposureNotifications = useRequestExposureNotifications()

  const handleOnPressEnableExposureNotifications = () => {
    requestExposureNotifications()
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.background.primaryLight} />
      <ScrollView
        contentContainerStyle={style.contentContainer}
        testID={"affected-user-enable-exposure-notifications-screen"}
        alwaysBounceVertical={false}
      >
        <View style={style.headerContainer}>
          <Text style={style.header}>
            {t("export.enable_exposure_notifications_title")}
          </Text>
          <Text style={style.subheader}>
            {t("export.enable_exposure_notifications_body")}
          </Text>
        </View>
        <TouchableOpacity
          style={style.button}
          onPress={handleOnPressEnableExposureNotifications}
          accessibilityLabel={t("export.enable_exposure_notifications_button")}
        >
          <Text style={style.buttonText}>
            {t("export.enable_exposure_notifications_button")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.massive,
    backgroundColor: Colors.background.primaryLight,
  },
  headerContainer: {
    marginBottom: Spacing.huge,
  },
  header: {
    ...Typography.header.x60,
    marginBottom: Spacing.small,
  },
  subheader: {
    ...Typography.body.x20,
  },
  button: {
    ...Buttons.primary.base,
  },
  buttonText: {
    ...Typography.button.primary,
  },
})

export default EnableExposureNotifications
