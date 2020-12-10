import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
} from "react"

import { StorageUtils } from "./utils"

export const VaccinationContext = createContext<
  VaccinationContextState | undefined
>(undefined)

export interface VaccinationContextState {
  vaccinationStage: string
  setVaccinationStageNoEligibility: () => Promise<void>
  setVaccinationStageHasAppointment: () => Promise<void>
  setVaccinationStageHasDose1: () => Promise<void>
  setVaccinationStageHasDose2: () => Promise<void>
  resetVaccination: () => void
}

export const VaccinationContextProvider: FunctionComponent = ({
  children
}) => {
  const [vaccinationStage, setVaccinationStage] = useState<string>()

  const setVaccinationStageNoEligibility = async () => {
    await StorageUtils.setVaccinationStageNoEligibility();
    let stage = await StorageUtils.getVaccinationStage();
    setVaccinationStage(stage);
  }

  const setVaccinationStageHasAppointment = async () => {
    await StorageUtils.setVaccinationStageHasAppointment();
    let stage = await StorageUtils.getVaccinationStage();
    setVaccinationStage(stage);
  }

  const setVaccinationStageHasDose1 = async () => {
    await StorageUtils.setVaccinationStageHasDose1();
    let stage = await StorageUtils.getVaccinationStage();
    setVaccinationStage(stage);
  }

  const setVaccinationStageHasDose2 = async () => {
    await StorageUtils.setVaccinationStageHasDose2();
    let stage = await StorageUtils.getVaccinationStage();
    setVaccinationStage(stage);
  }

  const resetVaccination = async () => {
    await StorageUtils.removeVaccinationStage();
    let stage = await StorageUtils.getVaccinationStage();
    setVaccinationStage("");
  }

  return (
    <VaccinationContext.Provider
      value={{
        vaccinationStage,
        setVaccinationStageNoEligibility,
        setVaccinationStageHasAppointment,
        setVaccinationStageHasDose1,
        setVaccinationStageHasDose2,
        resetVaccination,
      }}
    >
      {children}
    </VaccinationContext.Provider>
  )
}

export const useVaccinationContext = (): VaccinationContextState => {
  const context = useContext(VaccinationContext)
  if (context === undefined) {
    throw new Error("VaccinationContext must be used with a provider")
  }
  return context
}

