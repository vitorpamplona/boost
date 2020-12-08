import { usePermissionsContext } from "../Device/PermissionsContext"

type ExposureDetectionStatus = "On" | "Off" | "Not Available"

export const useExposureDetectionStatus = (): ExposureDetectionStatus => {
  const { locationPermissions, exposureNotifications } = usePermissionsContext()

  const isLocationRequiredAndOff = locationPermissions === "RequiredOff"

  const isExposureNotificationsActive =
    exposureNotifications.status === "Active"

  const isExposureNotificationsAvailable =
    exposureNotifications.status !== "Unknown"

  const exposureDetectionStatus =
    isExposureNotificationsActive && !isLocationRequiredAndOff ? "On" :
      (isExposureNotificationsAvailable ? "Off" : "Not Available");

  return exposureDetectionStatus
}
