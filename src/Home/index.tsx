import React, { FunctionComponent } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import { useStatusBarEffect } from "../navigation"
import { useConfigurationContext } from "../ConfigurationContext"
import { StatusBar, Text } from "../components"

import CovidDataCard from "../CovidData/Card"
import ExposureDetectionStatusCard from "./ExposureDetectionStatus/Card"
import ShareLink from "./ShareLink"
import CallEmergencyServices from "./CallEmergencyServices"

import NewEligibilityCode from "./Cards/NewEligibilityCode"
import {SimpleVerificationFlowButton, EscrowVerificationFlowButton} from "./Cards/ReportTestResult"
import SelfAssessment from "./Cards/SelfAssessment"
import SymptomReport from "./Cards/SymptomReport"
import VaccineCard from "./Cards/VaccineCard"

import { Outlines, Spacing, Colors, Typography } from "../styles"

const Home: FunctionComponent = () => {
  useStatusBarEffect("dark-content", Colors.background.primaryLight)
  const { t } = useTranslation()
  const {
    displayCallEmergencyServices,
    displayCovidData,
    displaySelfAssessment,
    displaySymptomHistory,
    displayVaccinationHistory,
    emergencyPhoneNumber,
    verificationStrategy,
  } = useConfigurationContext()

  return (
    <>
      <StatusBar backgroundColor={Colors.background.primaryLight} />
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
      >
        <Text style={style.headerText}>{t("screen_titles.home")}</Text>
        <ExposureDetectionStatusCard />
        <VaccineCard />
        {displayCovidData && <CovidDataCard />}
        {displayVaccinationHistory && <NewEligibilityCode />}
        {verificationStrategy === "Simple" ? (
          <SimpleVerificationFlowButton />
        ) : (
          <EscrowVerificationFlowButton />
        )}
        <ShareLink />
        {displaySelfAssessment && <SelfAssessment />}
        {displaySymptomHistory && <SymptomReport />}
        {displayCallEmergencyServices && (
          <View style={style.callEmergencyServicesContainer}>
            <CallEmergencyServices phoneNumber={emergencyPhoneNumber} />
          </View>
        )}
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primaryLight,
  },
  contentContainer: {
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.xxxLarge,
    paddingHorizontal: Spacing.medium,
    backgroundColor: Colors.background.primaryLight,
  },
  headerText: {
    ...Typography.header.x60,
    ...Typography.style.bold,
    marginBottom: Spacing.medium,
  },
  callEmergencyServicesContainer: {
    borderTopWidth: Outlines.hairline,
    borderColor: Colors.neutral.shade25,
    paddingTop: Spacing.large,
  },
})

export default Home
