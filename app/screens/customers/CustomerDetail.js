import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableNativeFeedback
} from 'react-native'
import { Thumbnail } from 'native-base'
import Ref from '../../components/Ref'
import TabBar from '../../components/TabBar'
import {styles} from '../../assets/styles/Style'
import Link from '../../components/Link'
import List from '../../components/List'
import Button from '../../components/Button'
import Drawer from 'react-native-drawer'




export default class CustomerDetail extends Component{

    open()
    {
        this._drawer.open()
    }

    render()
    {
        const sideMenu = (
            <View>
                <Text>Hello world</Text>
            </View>
        )
        return(
            <Drawer
                content={sideMenu}
                ref={(ref) => this._drawer = ref}
            >
            <View style={[styles.container]}>
                <ScrollView style={[styles.content,{padding:20}]}>
                    {/*Heading*/}
                   <View style={{flex:0.5, flexDirection:'row', justifyContent:'space-between', marginBottom:12}}>
                        {/*Image*/}
                        <View style={{flex:1,}}>
                            <Thumbnail square style={{width:'100%', height:'100%',  borderWidth:1, borderColor:'#4C4949'}} source={require('../../assets/images/example.jpg')}/>
                        </View>
                        {/*Text heading*/}
                        <View style={{flex:2,marginLeft:12}}>
                            {/*Top*/}
                            <View style={{marginBottom:8}}>
                                <Text style={[styles.content_body_font,{fontSize:16}]}>PT. Karya Hebat International</Text>
                                <Text style={styles.content_header_italic}>Cust ID. 0123456</Text>
                            </View>
                            {/*Line*/}
                            <View style={{height:2, backgroundColor:'#4C4949',width:'100%', marginBottom:8}}>
                            </View>
                            {/*Bottom*/}
                            <View style={{marginBottom:8, flexDirection:'row', justifyContent:'space-between'}}>
                                <View>
                                    <Text style={styles.content_body_font}>Garry Priambudi</Text>
                                    <Text style={[styles.content_header_italic]}>CTO</Text>
                                </View>
                                <View>
                                    <TouchableNativeFeedback onPress={() => this.open()}>
                                        <View style={{ borderRadius:2, backgroundColor:'#4C4949', width:'100%', marginTop:2}}>
                                            <Text style={{fontSize:12, paddingLeft:10,paddingRight:10, alignSelf:'center', color:'#fff'}}>Edit Profile</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                        </View>
                   </View>
                   {/*Line*/}
                   <View style={{height:2, backgroundColor:'#4C4949',width:'100%', marginBottom:8}}>
                   </View>
                   <View style={{flexDirection:'row'}}>
                       {/*Col*/}
                       <View style={{flex:1, flexDirection:'column'}}>
                           <View style={{justifyContent:'flex-start',paddingTop:4,paddingBottom:4}}>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>Bussiness Sector :</Text>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>Sektor Bisnis A</Text>
                           </View>
                           <View style={{justifyContent:'flex-start',paddingTop:4,paddingBottom:4}}> 
                               <Text style={[styles.content_body_font,{fontSize:12}]}>Email Office :</Text>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>team.karyahebat@gmail.com</Text>
                           </View>
                       </View>
                       {/*Col*/}
                       <View style={{flex:1, flexDirection:'column'}}>
                           <View style={{justifyContent:'flex-start',paddingTop:4,paddingBottom:4}}>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>Phone Office :</Text>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>Sektor Bisnis A</Text>
                           </View>  
                           <View style={{justifyContent:'flex-start',paddingTop:4,paddingBottom:4}}>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>Address Office :</Text>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>team.karyahebat@gmail.com</Text>
                               <Text style={[styles.content_body_font,{fontSize:12}]}>team.karyahebat@gmail.com</Text>
                           </View>
                       </View>
                   </View>
                </ScrollView>
            </View>
            </Drawer>
        )
    }
}