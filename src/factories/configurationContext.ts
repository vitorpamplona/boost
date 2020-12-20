import { Factory } from "fishery"
import { Configuration } from "../ConfigurationContext"

export default Factory.define<Configuration>(() => ({
  appDownloadUrl: "appDownloadUrl",
  appPackageName: "appPackageName",
  displayAcceptTermsOfService: false,
  displayAppTransition: false,
  displayCallbackForm: false,
  displayCallEmergencyServices: false,
  displayCovidData: false,
  displaySymptomHistory: false,
  displayVaccinationHistory: false,
  displaySelfAssessment: false,
  displayAgeVerification: false,
  enableExposureNotification: true,
  enableProductAnalytics: false,
  emergencyPhoneNumber: "emergencyPhoneNumber",
  findATestCenterUrl: "findATestCenterUrl",
  healthAuthorityAdviceUrl: "authorityAdviceUrl",
  healthAuthorityCovidDataUrl: "authorityCovidDataUrl",
  healthAuthorityHealthCheckUrl: "healthAuthorityHealthCheckUrl",
  healthAuthorityLearnMoreUrl: "authorityLearnMoreUrl",
  healthAuthorityEulaUrl: "healthAuthorityEulaUrl",
  healthAuthorityPrivacyPolicyUrl: "authorityPrivacyPolicyUrl",
  healthAuthorityLegalPrivacyPolicyUrl: "authorityLegalPrivacyPolicyUrl",
  healthAuthorityVerificationCodeInfoUrl: "authorityVerificationCodeInfoUrl",
  includeSymptomOnsetDate: false,
  measurementSystem: "Imperial",
  minimumAge: "18",
  minimumPhoneDigits: 0,
  regionCodes: ["REGION"],
  stateAbbreviation: null,
  verificationStrategy: "Simple",
}))
