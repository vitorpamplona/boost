import dayjs from "dayjs"
import { isToday, posixToDayjs, beginningOfDay } from "./dateTime"

describe("isToday", () => {
  describe("when provided a posix that is today", () => {
    it("returns true", () => {
      const date = Date.now() + 1000

      const result = isToday(date)

      expect(result).toBe(true)
    })
  })

  describe("when provided a posix from a few days ago", () => {
    it("returns false", () => {
      const date = Date.now() - 24 * 60 * 60 * 1000

      const result = isToday(date)

      expect(result).toBe(false)
    })
  })

  describe("when provided a posix from a few days from now", () => {
    it("returns false", () => {
      const date = Date.now() + 24 * 60 * 60 * 1000

      const result = isToday(date)

      expect(result).toBe(false)
    })
  })
})

describe("posixToDayjs", () => {
  it("converts a valid posix timestamp into a Dayjs instance", () => {
    const date = new Date("2020/07/01")
    const posixTimeStamp = date.getTime()
    expect(posixToDayjs(posixTimeStamp)?.format("YYYY-MM-DD")).toEqual(
      date.toISOString().split("T")[0],
    )
  })

  it("returns null for an invalid posix timestamp", () => {
    expect(posixToDayjs(parseInt("not a valid int"))).toBeNull()
  })
})

describe("begginingOfDay", () => {
  it("returns UTC date", () => {
    const date = beginningOfDay(1600387200000)
    expect(dayjs.utc(date).format("YYYY-MM-DD HH:mm Z")).toEqual(
      "2020-09-18 00:00 +00:00",
    )
  })
})
