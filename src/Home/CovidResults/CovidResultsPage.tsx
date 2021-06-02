import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import DialogContainer from 'react-native-dialog/lib/Container';
import { getCovidReport } from '../../../src/utils/storage';
import { cameraClicked, ClearCovidRepButton, ClearReport, galleryClicked, ShowDetails, UploadCovidReportButton } from './CovidResultsUtils';
import ImageZoom from 'react-native-image-pan-zoom';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Affordances, Colors, Typography } from '../../../src/styles';



function CovidResultsPage() {
    const [showDialog, setShowDialog] = useState<Boolean>(false);
    const [report, setReport] = useState<JSON|null>();
    const [reload, setReload] = useState<number>(0);
    const [showImageDialog, setShowImageDialog] = useState<Boolean>(false);
    useEffect(() => {
        getCovidReport().then((data) => {
            if (data) {

                setReport(JSON.parse(data));
            }
            else{
                setReport(null);
            }
        });

    }, [reload])



    return (
        <ScrollView>
            <View style={styles.UPButton}>
            <UploadCovidReportButton onPress={()=>setShowDialog(true)}/>
            </View>
            {
                report?
                <View style={styles.UPButton}> 
            <ClearCovidRepButton onPress={()=>{ClearReport(setReload,report.path)}}/>
            </View>:null
            }
            {
                report ?
                    <View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.dialogText}>
                                Your covid Report
           </Text>
                            <TouchableOpacity onPress={() => { setShowImageDialog(true) }}>

                                <Image
                                    source={{
                                        width: 300,
                                        height: 400,

                                        uri: report.path
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={{ ...Typography.body.x30 }}>click on the image to zoom</Text>
                        </View>
                        <Text style={styles.ImageDetails}>Image details</Text>
                        <ShowDetails  imageDetails={report}/>
                    </View>
                    : null
            }
            <DialogContainer visible={showDialog} onBackdropPress={() => { setShowDialog(false) }}>

                <View>
                    <Text style={styles.dialogText} >
                        please choose any one
        </Text>
                    <View style={styles.optionButtonView}>
                        <Button color="#C186FC" title="camera" onPress={() => { cameraClicked(setReload, reload); setShowDialog(false) }} />
                        <Button color="#C186FC" title="gallery" onPress={() => { galleryClicked(setReload, reload); setShowDialog(false) }} />
                    </View>
                </View>
            </DialogContainer>

            <DialogContainer visible={showImageDialog} onBackdropPress={() => { setShowImageDialog(false) }} >
                {
                    report ?
                        <View>

                            <ImageZoom cropWidth={400}
                                cropHeight={500}
                                imageWidth={300}
                                imageHeight={400}>
                                <Image style={{ width: 300, height: 400 }}
                                    source={{ uri: report.path }} />
                            </ImageZoom>
                            <View style={{ padding: 20 }}>

                                <Button color="#C186FC" title="close zoom view" onPress={() => { setShowImageDialog(false) }} />
                            </View>
                        </View>
                        :
                        null
                }

            </DialogContainer>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    UPButton: {
        padding: 20,
    },
    optionButtonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 20
    },
    dialogText: {
        textAlign: "center",
        fontSize: 20
    },
    ImageDetails: {
        textAlign: "center",
       ...Typography.header.x40,
        marginVertical: 30
    }
})

export default CovidResultsPage
