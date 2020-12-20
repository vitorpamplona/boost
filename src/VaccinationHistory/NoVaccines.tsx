import React, { FunctionComponent } from "react"
import { Linking, View, StyleSheet, TouchableOpacity } from "react-native"
import { SvgXml } from "react-native-svg"
import { useTranslation } from "react-i18next"

import { Text } from "../components"
import { useConfigurationContext } from "../ConfigurationContext"
import { useCustomCopy } from "../configuration/useCustomCopy"

import { Colors, Typography, Spacing, Affordances } from "../styles"
import { Icons } from "../assets"

const NoVaccines: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <View>
      <View style={style.noVaccineCard}>
        <Text style={style.headerText}>
          {t("vaccination_history.no_vaccination_reports")}
        </Text>
        <Text style={style.subheaderText}>
          {t("vaccination_history.no_vaccination_reports_over_past")}
        </Text>
      </View>
      <HealthGuidelines />
    </View>
  )
}

const HealthGuidelines: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <View style={style.card}>
      <Text style={style.cardHeaderText}>
        {t("vaccination_history.protect_yourself_and_others")}
      </Text>
      
      <HealthGuidelineItem
        icon={Icons.WashHands}
        text={t("vaccination_history.no_vaccine_next_step.receive_eligibility_confirmation")}
      />
      <HealthGuidelineItem
        icon={Icons.WashHands}
        text={t("vaccination_history.no_vaccine_next_step.record_vaccination")}
      />
      <HealthGuidelineItem
        icon={Icons.House}
        text={t("vaccination_history.no_vaccine_next_step.find_provider")}
      />
      <HealthGuidelineItem
        icon={Icons.Mask}
        text={t("vaccination_history.no_vaccine_next_step.learn_more_about_vaccines")}
      />
    </View>
  )
}

type HealthGuidelineItemProps = {
  text: string
  icon: string
}
const HealthGuidelineItem: FunctionComponent<HealthGuidelineItemProps> = ({
  text,
  icon,
}) => {
  return (
    <View style={style.listItem}>
      <View style={style.listItemIconContainer}>
        <SvgXml xml={icon} fill={Colors.primary.shade125} />
      </View>
      <Text style={style.listItemText}>{text}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  noVaccineCard: {
    ...Affordances.floatingContainer,
    backgroundColor: Colors.primary.shade125,
    borderColor: Colors.primary.shade125,
    marginBottom: Spacing.small,
  },
  headerText: {
    ...Typography.header.x20,
    paddingBottom: Spacing.xxxSmall,
    color: Colors.neutral.white,
  },
  subheaderText: {
    ...Typography.body.x30,
    color: Colors.secondary.shade10,
  },
  card: {
    ...Affordances.floatingContainer,
  },
  cardHeaderText: {
    ...Typography.header.x40,
    paddingBottom: Spacing.xSmall,
  },
  cardSubheaderText: {
    ...Typography.body.x20,
    paddingBottom: Spacing.large,
  },
  learnMoreCtaContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: Spacing.large,
  },
  learnMoreCta: {
    ...Typography.button.secondary,
    color: Colors.primary.shade125,
  },
  ctaArrow: {
    marginLeft: Spacing.xxSmall,
  },
  listHeading: {
    ...Typography.header.x20,
    paddingBottom: Spacing.medium,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: Spacing.small,
  },
  listItemIconContainer: {
    width: Spacing.huge,
  },
  listItemText: {
    ...Typography.body.x20,
  },
})

export default NoVaccines
