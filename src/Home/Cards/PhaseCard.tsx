import React, { FunctionComponent, useEffect, useState } from "react"
import { View , StyleSheet, Text,TouchableOpacity} from "react-native"


import {
    Colors,
    Typography,
    Affordances,
  } from "../../styles"
import {getPhase, getPhaseMessage, removePhase,setLocalPhase, setPhaseMessage } from "../../utils/storage"
import Pen from "../../assets/svgs/pen"
 
  


const Options: FunctionComponent<{text:string,func:Function}> = ({text,func})=>{

    return(
         <TouchableOpacity   style={styles.optioncontainer} onPress={func}>
             <Text style={{textAlign:"center"}}>{text}</Text>
         </TouchableOpacity>
    );
}

const PhaseCard: FunctionComponent  = ()=>{
  const [Phase, setPhase]= useState<string|null>("random words to prevent it from rendering");
  const [Message, setMessage]= useState<string|null>(null);

  const setPhaseLocal=(item:string,message:string)=>{
     setLocalPhase(item);
     setPhaseMessage(message)
     setPhase(item)
     setMessage(message)

  }
  const getPhaseData=()=>{
    getPhase().then((value)=>{
      value?setPhase(value):setPhase(null) 
    })
    getPhaseMessage().then((message)=>{
      message?setMessage(message):setMessage(null)
    })
  }

  useEffect(()=>{
    getPhaseData()
  },[Phase])

  const editClicked =()=>{
    removePhase().then(()=>{
      setPhase(null);
    })
  }

  if(!Phase)
  {    
  return(
        <View style={styles.container}>
          <Text style={styles.header}>Choose whichever is applicable</Text>
            <Options text="I am a Frontline essential worker" func={()=>{setPhaseLocal("1b","I am a Frontline essential worker")}} />
            <Options text=" I am aged 75 years and older" func={()=>{setPhaseLocal("1b","I am aged 75 years and older")}} />
            <Options text="I am 65—74 years old" func={()=>{setPhaseLocal("1c","I am 65—74 years old")}} />
            <Options text="I am 16—64 years with underlying medical conditions" func={()=>{setPhaseLocal("1c","I am 16—64 years with underlying medical conditions")}}  /> 
            <Options text="None of the above"  func={()=>{setPhaseLocal("normal","None of the above")}}  /> 
             </View> 
        
    );
  }
  else{
    return <View style={styles.container}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
       <Text style={styles.headerVacc}>your vaccination Phase: {Phase}</Text>
       <TouchableOpacity onPress={()=>{editClicked()}}>
       <Pen/>
       </TouchableOpacity>

      </View>

    <View>
      <Text style={styles.headerVacc}>you choose: {Message}</Text>
    </View>
       </View>;
  }
}

   

const styles= StyleSheet.create({
    container:{
        ...Affordances.floatingContainer,
        
    },
    header:{
            ...Typography.header.x40,
            color: Colors.neutral.black,
    },
    headerVacc:{
      ...Typography.header.x20,
      color: Colors.neutral.black,
    },
  optioncontainer:{
    padding:10,
    marginVertical:10,
    backgroundColor: "#C186FC",
    borderRadius:10,
    alignItems:"center", }
})
export default PhaseCard;
