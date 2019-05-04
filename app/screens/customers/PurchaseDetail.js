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



export default class CustomerDetail extends Component{

    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            <View style={[styles.container]}>
                <ScrollView style={[styles.content,{padding:0}]}>
                   {/*Banner*/}
                   <View>
                        <Image source={require('../../assets/images/example.jpg')} style={styles.content_banner_image}/>                       
                   </View>
                   <View style={styles.content_body}>
                        {/*Heading*/}
                        <View style={styles.content_body_heading}>
                            <Text style={[styles.content_body_heading_font,{fontSize:12}]}>Customer PO</Text>
                            <View>
                                <Text style={[styles.content_body_date_font,{fontSize:12}]}>24 Maret 2017</Text>
                                <TouchableNativeFeedback>
                                    <View style={{ borderRadius:2, backgroundColor:'#4C4949', width:'100%', marginTop:2}}>
                                        <Text style={{fontSize:10, paddingLeft:10,paddingRight:10, alignSelf:'center', color:'#fff'}}>Edit Profile</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                        {/*Content*/}
                        <View>
                            <Text style={[styles.content_body_font,{fontSize:12}]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis quo voluptates minima blanditiis officiis, ab labore quae nostrum, dicta aut provident beatae voluptatibus corrupti delectus quisquam nulla at soluta amet! {'\n'}</Text>
                        </View>
                        {/*Place*/}
                    </View>
                    <View style={{flexDirection:'column',borderTopWidth:1,borderBottomWidth:1,borderColor:'#7F7F7F', padding:12 , flex:1,}}>
                        {/**/}
                        <Text style={[styles.content_title,{fontSize:12}]}>
                            Location Job
                        </Text>
                        <Text style={[styles.content_body_font,{fontSize:14}]}>
                            Jalan Diponegoro
                        </Text>
                        <Text style={[styles.content_body_font,{fontSize:12}]}>
                            Jakarta
                        </Text>
                    </View>
                    <View style={{flexDirection:'column', padding:12 , flex:1,}}>
                        {/**/}
                        <Text style={[styles.content_title,{fontSize:12}]}>
                            Customer
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            {/*Image profile*/}
                            <View>
                                <Image source={require('../../assets/images/example.jpg')} style={{width:70, height:70, borderRadius:2}}/>
                            </View>
                            {/*title*/}
                            <View style={{marginLeft:10}}>
                               <Text style={styles.content_body_font}>PT. Karya Hebat Internasional</Text> 
                               <Text style={[styles.content_body_font,{fontSize:12}]}>Gary Priambudi</Text> 
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}