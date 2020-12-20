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
        "You haven't received any vaccination eligibility codes",
      ),
    ).not.toBeNull()
  })

  it("displays generic health guidance", () => {
    expect.assertions(1)
    const { queryByText } = render(<NoVaccines />)
    expect(queryByText("Wait until you receive your eligibility codes")).not.toBeNull()
  })
})
