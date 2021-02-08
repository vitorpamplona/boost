import React, { FunctionComponent } from 'react'
import Svg, { Path,G } from "react-native-svg"
const Pen: FunctionComponent =()=> {
return(
    <Svg
    width={25}
    height={25}
    viewBox="0 0 18 18"
    
    >
    <G fill="none" fillRule="evenodd">
      <Path d="M-3-3h24v24H-3z" />
      <Path
        d="M0 14.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L14.81 6.94l-3.75-3.75L.15 14.1c-.1.1-.15.22-.15.36zM17.71 4.04a.996.996 0 000-1.41L15.37.29a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        fill="#1D1D1D"
        />
    </G>
  </Svg>

);
} 

export default Pen;