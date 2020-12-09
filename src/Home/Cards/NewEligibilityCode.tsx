import React, { FunctionComponent } from "react"
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import {
  VaccineEligibilityFlowStackScreens,
  HomeStackScreens,
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

const NewEligibilityCode: FunctionComponent = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const handleOnPressNewElegibilityCode = () => {
    navigation.navigate(HomeStackScreens.VaccineEligibilityStack)
  }

  const handleOnPressMoreInfo = () => {
    navigation.navigate(HomeStackScreens.VaccineEligibilityStack, {
      screen: VaccineEligibilityFlowStackScreens.VaccineEligibilityCodeInfo,
    })
  }

  return (
    <TouchableOpacity
      onPress={handleOnPressNewElegibilityCode}
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
          onPress={handleOnPressMoreInfo}
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
        {t("home.have_an_eligibility_code")}
      </Text>
      <Text style={style.sectionBodyText}>{t("home.if_you_have_an_eligibility_code")}</Text>
      <SectionButton text={t("home.submit_code")} />
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

export default NewEligibilityCode