import React from "react"
import { render, fireEvent } from "@testing-library/react-native"

import Complete from "./Complete"
import { VaccineEligibilityContext } from "./VaccineEligibilityContext"
import { factories } from "../factories"

jest.mock("@react-navigation/native")
describe("Complete", () => {
  it("displays information about completing the flow", () => {
    const { getByText } = render(
      <VaccineEligibilityContext.Provider
        value={factories.affectedUserFlowContext.build()}
      >
        <Complete />
      </VaccineEligibilityContext.Provider>,
    )
    expect(getByText("Your code was verified!")).toBeDefined()
    expect(
      getByText(
        "Prepare for the vaccine by allowing yourself a day off after vaccination. Some symptoms are slightly uncomfortable.",
      ),
    ).toBeDefined()
  })

  describe("when the user presses done", () => {
    it("navigates out of the stack", () => {
      const navigateOutOfStackSpy = jest.fn()
      const { getByLabelText } = render(
        <VaccineEligibilityContext.Provider
          value={factories.affectedUserFlowContext.build({
            navigateOutOfStack: navigateOutOfStackSpy,
          })}
        >
          <Complete />
        </VaccineEligibilityContext.Provider>,
      )

      fireEvent.press(getByLabelText("Done"))
      expect(navigateOutOfStackSpy).toHaveBeenCalled()
    })
  })
})
