import { StyleSheet } from 'react-native'
import global from "../../../../style";

export default StyleSheet.create({

     box:{
         flex:1
     },
     news_item:{
        paddingLeft:10,
        paddingRight:10
     },
     item_box:{
         borderBottomColor:global.borderColor,
         borderBottomWidth:1,
         paddingTop:10,
         paddingBottom:10
     },
     item_box_text:{
        color:"#333",
        fontSize:18
     },
     item_box_bottom:{
         marginTop:20,
         flexDirection:"row"
     },
     item_box_bottom_left:{
         fontSize:14,
         color:"#999",
         lineHeight:17
     },
     item_box_bottom_right:{
        color:"#999",
        marginLeft:10,
        lineHeight:17
    },
    item_left:{
      width:100,
      height:62.5,
      borderRadius:6
    },
    item_right:{
       marginLeft:15,
       flex:1
    },
    multi_img:{
        marginTop:5,
        flexDirection:"row" 
    },
    multi_img_img:{
        flex:1,
        height:62.5,
        borderRadius:4
    }
})