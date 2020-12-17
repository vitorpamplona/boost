import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react-native"
import NoVaccines from "./NoVaccines"
import { Linking } from "react-native"
import { ConfigurationContext } from "../ConfigurationContext"
import { factories } from "../factories"

afterEach(cleanup)
describe("NoVaccines", () => {
  it("reports when a user has no exposures", () => {
    expect.assertions(2)
    const { queryByText } = render(<NoVaccines />)
    expect(queryByText("No Vaccination Reports")).not.toBeNull()
    expect(
      queryByText(
        "You haven't received any exposure reports over the past 14-days",
      ),
    ).not.toBeNull()
  })

  it("displays generic health guidance", () => {
    expect.assertions(1)
    const { queryByText } = render(<NoVaccines />)
    expect(queryByText("Wait until you receive your eligibility codes")).not.toBeNull()
  })

  describe("clicking the Learn more link", () => {
    describe("when the health authority has provided a learn more url", () => {
      it("prompts the user to see HA guidance", () => {
        expect.assertions(2)
        const healthAuthorityLearnMoreUrl = "https://www.example.com/"
        const openURLSpy = jest.spyOn(Linking, "openURL")

        const { queryByText, getByText } = render(
          <ConfigurationContext.Provider
            value={factories.configurationContext.build({
              healthAuthorityLearnMoreUrl,
            })}
          >
            <NoVaccines />
          </ConfigurationContext.Provider>,
        )

        expect(queryByText(`Review guidance from`)).toBeDefined()
        fireEvent.press(getByText("Learn More"))
        expect(openURLSpy).toHaveBeenCalledWith(healthAuthorityLearnMoreUrl)
      })
    })

    describe("when the health authority has not provided a link", () => {
      it("does not display a Learn More link", () => {
        expect.assertions(1)
        const healthAuthorityAdviceUrl = ""
        const healthAuthorityLearnMoreUrl = ""

        const { queryByText } = render(
          <ConfigurationContext.Provider
            value={factories.configurationContext.build({
              healthAuthorityAdviceUrl,
              healthAuthorityLearnMoreUrl,
            })}
          >
            <NoVaccines />
          </ConfigurationContext.Provider>,
        )

        expect(queryByText("Learn More")).toBeNull()
      })
    })
  })
})
