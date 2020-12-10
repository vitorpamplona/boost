import React, { FunctionComponent } from "react"
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import {
  AffectedUserFlowStackScreens,
  HomeStackScreens,
  EscrowVerificationRoutes,
  useStatusBarEffect,
} from "../../navigation"

import SectionButton from "./../SectionButton"

import { Icons, Images } from "../../assets"
import {
  Spacing,
  Colors,
  Typography,
  Affordances,
  Iconography,
  Buttons,
} from "../../styles"

const IMAGE_HEIGHT = 170

const SimpleVerificationFlowButton: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleOnPressReportTestResult = () => {
    navigation.navigate(HomeStackScreens.AffectedUserStack)
  }

  const handleOnPressMoreInfo = () => {
    navigation.navigate(HomeStackScreens.AffectedUserStack, {
      screen: AffectedUserFlowStackScreens.VerificationCodeInfo,
    })
  }

  const descriptionText = t("home.verification_code_card.if_you_have_a_code")
  const buttonLabelText = t("home.verification_code_card.submit_code")

  return (
    <VerificationFlowButton
      onPressReportTestResult={handleOnPressReportTestResult}
      onPressMoreInfo={handleOnPressMoreInfo}
      descriptionText={descriptionText}
      buttonLabelText={buttonLabelText}
    />
  )
}

const EscrowVerificationFlowButton: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleOnPressReportTestResult = () => {
    navigation.navigate(HomeStackScreens.EscrowVerificationStack)
  }

  const handleOnPressMoreInfo = () => {
    navigation.navigate(HomeStackScreens.EscrowVerificationStack, {
      screen: EscrowVerificationRoutes.EscrowVerificationMoreInfo,
    })
  }

  const descriptionText = t(
    "home.verification_code_card.if_you_have_a_positive_test",
  )
  const buttonLabelText = t("home.verification_code_card.report_positive_test")

  return (
    <VerificationFlowButton
      onPressReportTestResult={handleOnPressReportTestResult}
      onPressMoreInfo={handleOnPressMoreInfo}
      descriptionText={descriptionText}
      buttonLabelText={buttonLabelText}
    />
  )
}

interface VerificationFlowButtonProps {
  onPressReportTestResult: () => void
  onPressMoreInfo: () => void
  descriptionText: string
  buttonLabelText: string
}

const VerificationFlowButton: FunctionComponent<VerificationFlowButtonProps> = ({
  onPressReportTestResult,
  onPressMoreInfo,
  descriptionText,
  buttonLabelText,
}) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity
      onPress={onPressReportTestResult}
      style={style.floatingContainer}
    >
      <View style={style.cardTopContainer}>
        <Image
          source={Images.ProtectPrivacySubmitKeys}
          style={style.image}
          width={130}
          height={IMAGE_HEIGHT}
        />
        <TouchableOpacity
          onPress={onPressMoreInfo}
          style={style.moreInfoButton}
          accessibilityRole="button"
          accessibilityLabel={t("home.verification_code_card.more_info")}
        >
          <SvgXml
            xml={Icons.QuestionMark}
            fill={Colors.primary.shade125}
            width={Iconography.xxxSmall}
            height={Iconography.xxxSmall}
          />
        </TouchableOpacity>
      </View>
      <Text style={style.sectionHeaderText}>
        {t("home.have_a_positive_test")}
      </Text>
      <Text style={style.sectionBodyText}>{descriptionText}</Text>
      <SectionButton text={buttonLabelText} />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  floatingContainer: {
    ...Affordances.floatingContainer,
  },
  cardTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    resizeMode: "contain",
    marginBottom: Spacing.small,
  },
  moreInfoButton: {
    ...Buttons.circle.base,
  },
  sectionHeaderText: {
    ...Typography.header.x40,
    color: Colors.neutral.black,
    marginBottom: Spacing.xSmall,
  },
  sectionBodyText: {
    ...Typography.header.x20,
    ...Typography.style.normal,
    lineHeight: Typography.lineHeight.x40,
    color: Colors.neutral.shade100,
    marginBottom: Spacing.xLarge,
  }
})

export { SimpleVerificationFlowButton, EscrowVerificationFlowButton }