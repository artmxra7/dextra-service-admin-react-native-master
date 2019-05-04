import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView
} from 'react-native'
import Ref from '../../components/Ref'
import TabBar from '../../components/TabBar'
import { Icon} from 'react-native-elements'
import { Thumbnail } from 'native-base'
import {styles} from '../../assets/styles/Style'
import Link from '../../components/Link'
import List from '../../components/List'




export default class Purchase extends Component{

     constructor(props)
     {
         super(props)
     }
     
     customerDetail()
     {
         this.props.navigation.navigate('PurchaseDetail')
     }


    render()
    {
        return(
            <View style={[styles.container]}>
                <ScrollView style={[styles.content,{padding:2}]}>
                    <Link onPress={() => this.customerDetail()}>
                        <List>
                            <View style={[styles.col_list,{flexDirection:'row',flex:1}]}>
                                <View>
                                    <Thumbnail square style={{width:100,height:80}} source={require('../../assets/images/badge.jpg')}/>
                                    <Text style={{fontSize:12, width:'100%' ,fontWeight:'bold',backgroundColor:'#4C4949', color:'#fff', alignSelf:'center',paddingLeft:14}}>Customer PO</Text>
                                </View>
                                <View style={{flexDirection:'column', flex:1, marginLeft:6}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.font_list,{flex:0.7}]}>Corporate Name </Text>
                                        <Text style={[styles.font_list,{flex:0.1}]}>:</Text> 
                                        <Text style={[styles.font_list,{flex:1}]}>PT. xyz Adiguna</Text>                                        
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.font_list,{flex:0.7}]}>Contact Name </Text>
                                        <Text style={[styles.font_list,{flex:0.1}]}>:</Text> 
                                        <Text style={[styles.font_list,{flex:1}]}>Adtiya Handoko</Text>                                        
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.font_list,{flex:0.7}]}>Title </Text>
                                        <Text style={[styles.font_list,{flex:0.1}]}>:</Text> 
                                        <Text style={[styles.font_list,{flex:1}]}>Direktur</Text>                                        
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.font_list,{flex:0.7}]}>Office address </Text>
                                        <Text style={[styles.font_list,{flex:0.1}]}>:</Text> 
                                        <Text style={[styles.font_list,{flex:1}]}>Jl. Semanggi 2 Jakarta Pusat</Text>                                        
                                    </View>
                                </View>
                            </View>
                        </List>
                    </Link>
                </ScrollView>
            </View>
        )
    }
}