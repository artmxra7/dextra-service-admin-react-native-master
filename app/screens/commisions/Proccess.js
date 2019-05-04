import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView
} from 'react-native'
import { Thumbnail } from 'native-base'
import TabBar from '../../components/TabBar'
import {styles} from '../../assets/styles/Style'
import Link from '../../components/Link'
import List from '../../components/List'
import Button from '../../components/Button'




export default class Proccess extends Component{

    redirect(route)
    {
        const { navigate } = this.props.navigation
        navigate(route)
    }

    render()
    {
        return(
            <View style={[styles.container]}>
                <ScrollView style={[styles.content,{padding:0, paddingTop:2, backgroundColor: '#eee'}]}>
                    <Link onPress={() => {this.redirect('CustomerDetail')}}>
                        <List>
                            <View style={[styles.col_list,{flexDirection:'row',flex:1}]}>
                                <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:4,paddingTop:8,marginRight:4,paddingBottom:8, flex:1}}>
                                    <View style={{flexDirection:'column', flex:1.5}}>
                                        <Text style={[styles.font_list,{fontSize:10}]}>24 Maret 2017</Text>
                                        <Text style={[styles.font_list,{fontSize:12}]}>Bank : BCA</Text>
                                        <Text style={[styles.font_list,{fontSize:12}]}>No.Rek : 0123456</Text>
                                        <Text style={[styles.font_list,{fontSize:12}]}>A.N : Zulfikra L. Abdjul</Text>
                                    </View>
                                    <View style={{flexDirection:'column',flex:1, alignItems:'flex-end'}}>
                                        <Text style={[styles.content_body_heading_font,{fontSize:18}]}>Rp.20.000</Text>
                                        <Text style={[styles.font_list,{fontSize:10}]}>status: Proccess</Text>
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
