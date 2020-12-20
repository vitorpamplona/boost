import React from "react"
import { Alert } from "react-native"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"
import { useNavigation } from "@react-navigation/native"

import CodeInputForm from "./CodeInputForm"
import { VaccineEligibilityProvider } from "../VaccineEligibilityContext"
import { VaccinationContextProvider } from "../../VaccinationContext"
import { VaccineEligibilityFlowStackScreens } from "../../navigation"
import { ExposureContext } from "../../ExposureContext"
import { factories } from "../../factories"

jest.mock("../../logger.ts")
jest.mock("@react-navigation/native")
;(useNavigation as jest.Mock).mockReturnValue({ navigate: jest.fn() })
describe("CodeInputForm", () => {
  it("initializes with an empty code form", () => {
    const { getByTestId } = render(
      <VaccinationContextProvider>
        <VaccineEligibilityProvider isOnboardingComplete>
          <CodeInputForm linkCode="linkCode" />
        </VaccineEligibilityProvider>
      </VaccinationContextProvider>,
    )

    expect(getByTestId("affected-user-code-input-form")).not.toBeNull()
    expect(getByTestId("code-input")).toHaveTextContent("")
  })
})
