import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll"
import ImagePicker from "react-native-image-crop-picker";
import { removeCovidReport, setCovidReport } from '../../../src/utils/storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Affordances, Colors, Typography } from '../../../src/styles';
export const galleryClicked = (setReload: Function, reload: number) => {
    ImagePicker.openPicker({
        cropping: true
    }).then(async (image) => {
       await CameraRoll.saveToCameraRoll(image.path,"photo")
        .then((saved)=>{
            image.path=saved;
        })
        .catch((e)=>{Alert.alert(e.message)})
        setCovidReport(image).then(() => { setReload(reload + 1) });
    });
}

export const ClearReport =async(setReload:Function,path:string)=>{
    
    await removeCovidReport()
    await ImagePicker.clean().then(()=>{
        Alert.alert("Cleared Report");
        setReload(5);
    })
}

export const cameraClicked = (setReload: Function, reload: number) => {
    ImagePicker.openCamera({
        cropping: true,
    }).then(image => {
            CameraRoll.saveToCameraRoll(image.path,"photo")
            .then(()=>{Alert.alert("saved to gallery")})
            .catch((e)=>{Alert.alert(e.message)})
            setCovidReport(image).then(() => { setReload(reload + 1) });
    });
}





const SingleDetail: FunctionComponent<{ name: string, detail: any }> = ({ name, detail }) => {
    return (
        <View style={styles.cont}>
            <Text style={styles.name}>{name+":"}</Text>
            <Text style={styles.detail}>{detail}</Text>
        </View>
    );
}
export const ShowDetails: FunctionComponent<{ imageDetails: JSON }> = ({ imageDetails }) => {

    const unixTime = imageDetails.modificationDate;
    var date = new Date(unixTime * 1);


    return (
        <View>
            <SingleDetail name="date" detail={date.toLocaleDateString()} />
            <SingleDetail name="size" detail={parseInt(imageDetails.size)/1000000 + " megabytes"} />
            <SingleDetail name="path" detail={imageDetails.path} />


        </View>
    );
}

export const UploadCovidReportButton: FunctionComponent<{onPress: Function}> = ({onPress})=>{
    return(
        <TouchableOpacity onPress={()=>onPress()}>
        <View style={styles.uploadReportButton}>
            <Text style={styles.UploadReportText}>Upload Covid-19 report</Text>
        </View>

        </TouchableOpacity>

    );

}

export const ClearCovidRepButton: FunctionComponent<{onPress: Function}> = ({onPress})=>{
    return(
        <TouchableOpacity onPress={()=>onPress()}>
        <View style={styles.uploadReportButton}>
            <Text style={styles.UploadReportText}>Clear Report</Text>
        </View>

        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({
name:{
    fontSize:20
},
cont:{
flexDirection:"row",
padding: 20,
alignItems:"center",
justifyContent:"space-between"
},
detail:{
    marginHorizontal:20,
    fontSize:15
},
uploadReportButton:{
backgroundColor : "#C186FC",
padding: 10,
borderRadius:10,
justifyContent:"center",
alignItems:"center",
},
UploadReportText:{
...Typography.header.x30
}
});