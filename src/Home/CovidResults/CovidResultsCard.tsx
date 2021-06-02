
import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CovidReportStackScreens } from 'src/navigation';
import { Affordances, Colors, Typography } from '../../../src/styles';



function CovidResultsCard() {
  const navigation = useNavigation()
    return (
      <TouchableOpacity
      activeOpacity={1}
      onPress={()=>{
        navigation.navigate("CovidReport")
      }}
      >

  <View style={styles.container} 
  >
        <Text style={styles.text} >Covid-19 report</Text>
  </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
container:{
...Affordances.floatingContainer,
marginHorizontal:5,
marginVertical:20,
alignItems: "center"
},
text:{
  ...Typography.header.x20,
  color: Colors.neutral.black,

}
});


export default CovidResultsCard
