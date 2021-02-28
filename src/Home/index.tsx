import React, { FunctionComponent } from "react"
import { View, ScrollView, StyleSheet, Button, Alert, } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import { useStatusBarEffect } from "../navigation"
import { useConfigurationContext } from "../ConfigurationContext"
import { useVaccinationContext } from "../VaccinationContext"
import { StatusBar, Text } from "../components"

import CovidDataCard from "../CovidData/Card"
import ExposureDetectionStatusCard from "./ExposureDetectionStatus/Card"
import ShareLink from "./ShareLink"
import HealthCheckLink from "./HealthCheckLink"
import CallEmergencyServices from "./CallEmergencyServices"

import NewEligibilityCode from "./Cards/NewEligibilityCode"
import {SimpleVerificationFlowButton, EscrowVerificationFlowButton} from "./Cards/ReportTestResult"
import SelfAssessment from "./Cards/SelfAssessment"
import SymptomReport from "./Cards/SymptomReport"
import VaccineCard from "./Cards/VaccineCard"
import AppointmentCard from "./Cards/AppointmentCard"
import NotificationsOff from "./Cards/NotificationsOff"

import { Outlines, Spacing, Colors, Typography } from "../styles"
import PhaseCard from "./Cards/PhaseCard"
import { getAppointments } from "src/utils/storage"

const Home: FunctionComponent = () => {
  useStatusBarEffect("dark-content", Colors.background.primaryLight)
  const { t } = useTranslation()
  const {
    appDownloadUrl,
    displayCallEmergencyServices,
    displayCovidData,
    displaySelfAssessment,
    displaySymptomHistory,
    displayVaccinationHistory,
    enableExposureNotification,
    emergencyPhoneNumber,
    healthAuthorityHealthCheckUrl,
    verificationStrategy,
  } = useConfigurationContext()
  const {
    vaccines, appointments
  } = displayVaccinationHistory && useVaccinationContext();

  return (
    <>
      <StatusBar backgroundColor={Colors.background.primaryLight} />
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
      >
        <Text style={style.headerText}>{t("screen_titles.home")}</Text>
        <NotificationsOff />
        <PhaseCard/>
        {enableExposureNotification && <ExposureDetectionStatusCard />} 
        {displayVaccinationHistory && vaccines && vaccines.map((entry, i) => {
          return <VaccineCard key={i} 
              name={entry.name}
              manufacturer={entry.manufacturer} 
              doseSequence={entry.doseSequence} 
              date={entry.date} 
              vaccinator={entry.vaccinator} 
              eligibilityCode={entry.eligibilityCode} 
              qr_code={entry.qr_code}
              nextDose={entry.nextDose}
              requiredDoses={entry.requiredDoses} />
        })}

        {displayVaccinationHistory && appointments && appointments.map((entry, i) => {
          return <AppointmentCard key={i} 
                  manufacturer={entry.manufacturer} 
                  doseSequence={entry.doseSequence} 
                  eligibilityCode={entry.eligibilityCode} 
                  date={entry.date} 
                  location={entry.location} />
        })}

        {displayCovidData && <CovidDataCard />}
        {displayVaccinationHistory 
          && (!vaccines || vaccines.length === 0) 
          && (!appointments || appointments.length === 0) 
          && <NewEligibilityCode />
        }
        {enableExposureNotification && 
          ( verificationStrategy === "Simple" ? (
              <SimpleVerificationFlowButton />
            ) : (
             <EscrowVerificationFlowButton />
            )
          )
        } 
        {healthAuthorityHealthCheckUrl && (
          <HealthCheckLink healthCheckUrl={healthAuthorityHealthCheckUrl} />
        )}
        {appDownloadUrl && <ShareLink appDownloadUrl={appDownloadUrl} />}
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
