import React, { FunctionComponent } from "react"
import {
  Dimensions, View, StyleSheet
} from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"
import { StatusBar } from "../components"

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNSimpleCrypto from "react-native-simple-crypto";

import { Stacks } from "../navigation"

import { Buttons, Colors, Spacing, Typography } from "../styles"

import { useStatusBarEffect } from "../navigation"
import {
  VaccineEligibilityFlowStackScreens,
  VaccinationHistoryStackScreens,
  HomeStackScreens,
} from "../navigation"
import { useVaccinationContext } from "../VaccinationContext"

import { Text } from "../components"

const screenHeight = Math.round(Dimensions.get('window').height);

const QRReaderScreen: FunctionComponent = (props) => {
  useStatusBarEffect("dark-content", Colors.background.primaryLight)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { addVaccine } = useVaccinationContext()
  
  const myDecode = (uriComponent) => {
    return uriComponent ? decodeURIComponent(uriComponent).replace(/\+/g, ' ') : undefined;
  }

  const showErrorMessage = (message) => {
    navigation.setOptions({ headerTitle: message, 
                            headerTitleStyle: {color: Colors.text.error} });
    // Start counting when the page is loaded
    const timeoutHandle = setTimeout(()=>{
      navigation.setOptions({ headerTitle: 'Point Camera to the QR Code', 
                              headerTitleStyle: {color: Colors.header.text} });
    }, 5000);
  }

  const onVaccineRead = async (e) => {
    if (!e.data.startsWith("healthpass:")) {
      showErrorMessage("Not a Health Passport");
      return;
    }

    const queryString = require('query-string');

    let [verification, message] = e.data.substring("healthpass:".length).split("?");
    let [signatureFormat, pub_key_url] = verification.split("@");
    let [hashType, signature] = signatureFormat.split("\\");
    const params = queryString.parse(message, {decode:false});
    
    try {
      let pub_key_response = await fetch("https://"+pub_key_url);
      let pub_key = await pub_key_response.text();

      try {
        const signedCert = decodeURIComponent(signature).replace(/\n/g, '');
        const validSignature2 = await RNSimpleCrypto.RSA.verify(
          signedCert,
          message,
          pub_key,
          hashType
        );

        console.log(params.date);
        
        const nextDoseInDays = myDecode(params.next_dose_in_days);
        const vaccineDate = new Date(params.date);
        const nextDoseDay = new Date(vaccineDate.getTime() + 86400000 * nextDoseInDays);

        console.log(nextDoseInDays);
        console.log(params.date);
        console.log(nextDoseDay);

        if (validSignature2) {
          const vaccine = { 
                    eligibilityCode: props.route.params.eligibilityCode,
                    nextDose: nextDoseDay.getTime(),
                    date: vaccineDate.getTime(), 
                    name: myDecode(params.name), 
                    manufacturer: myDecode(params.manuf), 
                    lot: myDecode(params.lot),
                    route: myDecode(params.route),
                    site: myDecode(params.site),
                    dose: myDecode(params.dose),
                    requiredDoses: myDecode(params.required_doses),
                    nextDoseInDays: myDecode(params.next_dose_in_days),
                    vaccinee: myDecode(params.vaccinee), 
                    vaccinator: myDecode(params.vaccinator),
                    vaccinator_pub_key: params.vaccinator_pub_key,
                    signature: signedCert, 
                    scanDate: new Date().getTime(),
                    verified: validSignature2 ? "Valid" : "Not Valid", 
                    qr_code: e.data };

          addVaccine(vaccine);

          navigation.goBack();
        } else {
          showErrorMessage("Invalid Certificate");
        }
      } catch (error) {
        console.error(error);
        showErrorMessage("Could not load: " + error);
      }
    } catch (error) {
      console.error(error);
      showErrorMessage("QR Code Server Unavailable");
    }
  }

  return (
    <View style={style.outerContainer}>
      <StatusBar backgroundColor={Colors.background.primaryLight} />
      <QRCodeScanner
        onRead={onVaccineRead}
        reactivate={true}
        reactivateTimeout={5000}
        cameraStyle={{ height: screenHeight }}
        topViewStyle={{height: 0, flex: 0}}
        bottomViewStyle={{height: 0, flex: 0}}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primaryLight,
  },
})

export default QRReaderScreen
