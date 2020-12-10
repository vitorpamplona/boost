import AsyncStorage from "@react-native-community/async-storage"

type StorageKey = "LANG_OVERRIDE" | "ONBOARDING_COMPLETE" | "ANALYTICS_CONSENT" | "VACCINATION_STAGE"

const LANG_OVERRIDE: StorageKey = "LANG_OVERRIDE"
const ONBOARDING_COMPLETE: StorageKey = "ONBOARDING_COMPLETE"
const ANALYTICS_CONSENT: StorageKey = "ANALYTICS_CONSENT"
const VACCINATION_STAGE: StorageKey = "VACCINATION_STAGE"

type VaccinationStage = "HAS_APPOINTMENT" | "HAS_DOSE_1" | "HAS_DOSE_2"

const VACCINATION_STAGE_HAS_APPOINTMENT: VaccinationStage = "HAS_APPOINTMENT"
const VACCINATION_STAGE_HAS_DOSE_1: VaccinationStage = "HAS_DOSE_1"
const VACCINATION_STAGE_HAS_DOSE_2: VaccinationStage = "HAS_DOSE_2"


async function getStoreData(key: StorageKey): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

async function setStoreData(key: StorageKey, item: string): Promise<void> {
  try {
    return await AsyncStorage.setItem(key, item)
  } catch (error) {
    console.log(error.message)
  }
}

async function removeStoreData(key: StorageKey): Promise<void> {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log(error.message)
  }
}

export const removeAll = async (): Promise<void> => {
  removeUserLocaleOverride()
  removeIsOnboardingComplete()
  removeAnalyticsConsent()
  removeVaccinationStage()
}

// Language Override
export async function getUserLocaleOverride(): Promise<string | null> {
  return await getStoreData(LANG_OVERRIDE)
}

export async function setUserLocaleOverride(locale: string): Promise<void> {
  return await setStoreData(LANG_OVERRIDE, locale)
}

export async function removeUserLocaleOverride(): Promise<void> {
  return await removeStoreData("LANG_OVERRIDE")
}

// Onboarding completion
export async function getIsOnboardingComplete(): Promise<boolean> {
  const onboardingComplete = await getStoreData(ONBOARDING_COMPLETE)
  return onboardingComplete === ONBOARDING_COMPLETE
}

export async function setIsOnboardingComplete(): Promise<void> {
  return setStoreData(ONBOARDING_COMPLETE, ONBOARDING_COMPLETE)
}

export async function removeIsOnboardingComplete(): Promise<void> {
  return removeStoreData(ONBOARDING_COMPLETE)
}

// Vaccination Stages
export async function getVaccinationStage(): Promise<boolean> {
  return await getStoreData(VACCINATION_STAGE)
}

export async function setVaccinationStageHasAppointment(): Promise<void> {
  return await setStoreData(VACCINATION_STAGE, VACCINATION_STAGE_HAS_APPOINTMENT)
}

export async function setVaccinationStageHasDose1(): Promise<void> {
  return await setStoreData(VACCINATION_STAGE, VACCINATION_STAGE_HAS_DOSE_1)
}

export async function setVaccinationStageHasDose2(): Promise<void> {
  return await setStoreData(VACCINATION_STAGE, VACCINATION_STAGE_HAS_DOSE_2)
}

export async function removeVaccinationStage(): Promise<void> {
  return await removeStoreData(VACCINATION_STAGE)
}

// Consented to Product Analytics
const USER_CONSENTED = "USER_CONSENTED"
const USER_NOT_CONSENTED = "USER_NOT_CONSENTED"

export async function getAnalyticsConsent(): Promise<boolean> {
  const userConsented = await getStoreData(ANALYTICS_CONSENT)
  return consentToBoolean(userConsented)
}

export async function setAnalyticsConsent(consent: boolean): Promise<void> {
  return setStoreData(ANALYTICS_CONSENT, booleanToConsent(consent))
}

export async function removeAnalyticsConsent(): Promise<void> {
  return removeStoreData(ANALYTICS_CONSENT)
}

const consentToBoolean = (consent: string | null): boolean => {
  switch (consent) {
    case "USER_CONSENTED":
      return true
    case null:
      return false
    default:
      return false
  }
}

const booleanToConsent = (bool: boolean): string => {
  switch (bool) {
    case true:
      return USER_CONSENTED
    case false:
      return USER_NOT_CONSENTED
  }
}
