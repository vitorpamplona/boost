import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
  useEffect
} from "react"
import { Posix } from "../utils/dateTime"

import { StorageUtils } from "./utils"

export const determineVaccines = async (): Promise<string> => {
  return await StorageUtils.getVaccines();
}

export const determineAppointments = async (): Promise<string> => {
  return await StorageUtils.getAppointments();
}

export const VaccinationContext = createContext<
  VaccinationContextState | undefined
>(undefined)

export interface VaccineItem {
    eligibilityCode: string;
    date: Posix; 
    name: string; 
    doseSequence: int;
    nextDose: Posix;
    manufacturer: string, 
    route: string,
    dose: string;  
    lot: string, 
    site: string, 
    vacinee: string,
    vaccinator: string,  
    vaccinator_pub_key: string, 
    signature: string, 
    scanDate: string, 
    verified: boolean,         
    qr_code: string
}

export interface AppointmentItem {
    eligibilityCode: string; date: Posix; location: string; name: string; dose: int; 
}

export interface VaccinationContextState {
  vaccines: Array<VaccineItem>
  appointments: Array<AppointmentItem>
  addVaccine: (VaccineItem) => Promise<void>
  addAppointment: (AppointmentItem) => Promise<void>
  resetVaccination: () => Promise<void>
}

export const VaccinationContextProvider: FunctionComponent = ({
  children
}) => {
  const [appointments, setAppointments] = useState<Array>([]);
  const [vaccines, setVaccines] = useState<Array>([]);

  console.log ("Loading Vaccination Provicer")

  const fetchEntries = async () => {
    determineVaccines()
    .then((result) => {
      setVaccines(result);
    });
    determineAppointments()
    .then((result) => {
      setAppointments(result);
    });
  }

  const cleanupStaleData = async () => {

  }

  useEffect(() => {
    cleanupStaleData()
    fetchEntries()
  }, [])

  const addVaccine = async (vac: VaccineItem) => {
    seq = vaccines.filter(entry => entry.manufacturer===vac.manufacturer).length;
    vac.doseSequence = seq+1;
    
    // Add Vaccine to the Database
    setVaccines(await StorageUtils.addVaccine(vac));
    
    // Delete related appointment
    setAppointments(await StorageUtils.removeAppt(vac.eligibilityCode))
    
    // Make a new Appointment for the next dose if needed. 
    if (vac.doseSequence < vac.requiredDoses) {
      let nextAppt = {
        eligibilityCode: vac.code, 
        date: vac.nextDose, 
        location: vac.vaccinator, 
        manufacturer: vac.manufacturer, 
        doseSequence: vac.doseSequence+1
      }
      setAppointments(await StorageUtils.addAppointment(nextAppt));
    }
  }

  const addAppointment = async (appt: AppointmentItem) => {
    setAppointments(await StorageUtils.addAppointment(appt));
  }

  const resetVaccination = async () => {
    await StorageUtils.removeVaccines();
    await StorageUtils.removeAppointments();
    fetchEntries();
  }

  return (
    <VaccinationContext.Provider
      value={{
        vaccines, 
        appointments, 
        addVaccine,
        addAppointment,
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

