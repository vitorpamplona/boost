import React, { FunctionComponent, useEffect, useState } from "react"
import { View , StyleSheet, Text,TouchableOpacity} from "react-native"
import { useTranslation } from "react-i18next"


import {
    Colors,
    Typography,
    Affordances,
  } from "../../styles"
import {getPhase, getPhaseMessage, removePhase,setLocalPhase, setPhaseMessage } from "../../utils/storage"
import Pen from "../../assets/svgs/pen"
 
  


const Options: FunctionComponent<{text:string,func:Function}> = ({text,func})=>{

    return(
         <TouchableOpacity onPress={func}>
             <Text style={styles.optioncontainer}>{text}</Text>
         </TouchableOpacity>
    );
}

const PhaseCard: FunctionComponent  = ()=>{
  const [Phase, setPhase]= useState<string|null>("random words to prevent it from rendering");
  const [Message, setMessage]= useState<string|null>(null);
  const { t } = useTranslation();

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
            <Options text={t("phase_card.front_line_worker")} func={()=>{setPhaseLocal("1b", t("phase_card.front_line_worker"))}} />
            <Options text={t("phase_card.seventy_five_or_older")} func={()=>{setPhaseLocal("1b", t("phase_card.seventy_five_or_older"))}} />
            <Options text={t("phase_card.sixty_five_to_seventy_four")} func={()=>{setPhaseLocal("1c", t("phase_card.sixty_five_to_seventy_four"))}} />
            <Options text={t("phase_card.medical_conditions")} func={()=>{setPhaseLocal("1c",t("phase_card.medical_conditions"))}}  /> 
            <Options text={t("phase_card.none")} func={()=>{setPhaseLocal("normal",t("phase_card.none"))}}  />
        </View> 
        
    );
  }
  else{
    return <View style={styles.container}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
       <Text style={styles.headerVacc}>Your vaccination phase: {Phase}</Text>
       <TouchableOpacity onPress={()=>{editClicked()}}>
       <Pen/>
       </TouchableOpacity>

      </View>

    <View>
      <Text style={styles.headerVacc}>You chose: {Message}</Text>
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
      color: Colors.neutral.black,
      textAlign: "center"
    } 
})
export default PhaseCard;
