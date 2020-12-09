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
    expect(getByText("Thanks for keeping your community safe!")).toBeDefined()
    expect(
      getByText(
        "You’re helping contain the spread of the virus and protect others in your community.",
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
