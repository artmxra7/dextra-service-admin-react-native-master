import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import {styles} from '../../assets/styles/Style'
import { StackNavigator } from 'react-navigation'
import { Thumbnail } from 'native-base'
import { Icon } from 'react-native-elements'
import Ref from '../../components/Ref'
import TabBar from '../../components/TabBar'
import Link from '../../components/Link'
import List from '../../components/List'
import Button from '../../components/Button'



export default class Customer extends Component{

    constructor(props)
    {
        super(props)
        
    }

    customerDetail()
    {
         this.props.navigation.navigate('CustomerDetail')
    }

    redirect(route)
    {
        const { navigate } = this.props.navigation
        navigate(route)
    }

    

    render()
    {
        return(
            <View style={[styles.container]}>
                <ScrollView style={[styles.content,{padding:0, paddingTop:2}]}>
                    <Link onPress={() => {this.redirect('CustomerDetail')}}>
                        <List>
                            <View style={[styles.col_list,{flexDirection:'row',flex:1}]}>
                                <View>
                                    <Thumbnail source={require('../../assets/images/badge.jpg')}/>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:20,paddingTop:10, flex:1}}>
                                    <View style={{flexDirection:'column', flex:1}}>
                                        <Text style={styles.font_list}>CUST ID : DN23412</Text>
                                        <Text style={styles.font_list}>INTERNASIONAL</Text>
                                    </View>
                                    <View style={{flexDirection:'row',flex:1}}>
                                        <Text style={styles.font_list}>NAME: PT. KARYA HEBAT</Text>
                                    </View>
                                </View>
                            </View>
                        </List>
                    </Link>
                    <Link>
                        <List>
                            <View style={[styles.col_list,{flexDirection:'row',flex:1}]}>
                                <View>
                                    <Thumbnail source={require('../../assets/images/badge.jpg')}/>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:20,paddingTop:10, flex:1}}>
                                    <View style={{flexDirection:'column', flex:1}}>
                                        <Text style={styles.font_list}>CUST ID : DN23412</Text>
                                        <Text style={styles.font_list}>INTERNASIONAL</Text>
                                    </View>
                                    <View style={{flexDirection:'row',flex:1}}>
                                        <Text style={styles.font_list}>NAME: PT. KARYA HEBAT</Text>
                                    </View>
                                </View>
                            </View>
                        </List>
                    </Link>
                    <Link>
                        <List>
                            <View style={[styles.col_list,{flexDirection:'row',flex:1}]}>
                                <View>
                                    <Thumbnail source={require('../../assets/images/badge.jpg')}/>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:20,paddingTop:10, flex:1}}>
                                    <View style={{flexDirection:'column', flex:1}}>
                                        <Text style={styles.font_list}>CUST ID : DN23412</Text>
                                        <Text style={styles.font_list}>INTERNASIONAL</Text>
                                    </View>
                                    <View style={{flexDirection:'row',flex:1}}>
                                        <Text style={styles.font_list}>NAME: PT. KARYA HEBAT</Text>
                                    </View>
                                </View>
                            </View>
                        </List>
                    </Link>
                    <Link>
                        <List>
                            <View style={[styles.col_list,{flexDirection:'row',flex:1}]}>
                                <View>
                                    <Thumbnail source={require('../../assets/images/badge.jpg')}/>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:20,paddingTop:10, flex:1}}>
                                    <View style={{flexDirection:'column', flex:1}}>
                                        <Text style={styles.font_list}>CUST ID : DN23412</Text>
                                        <Text style={styles.font_list}>INTERNASIONAL</Text>
                                    </View>
                                    <View style={{flexDirection:'row',flex:1}}>
                                        <Text style={styles.font_list}>NAME: PT. KARYA HEBAT</Text>
                                    </View>
                                </View>
                            </View>
                        </List>
                    </Link>
                </ScrollView>
                <View style={{backgroundColor:'#4C4949',padding:12}}>
                    <Button text="Create Customer" onPress={() => {this.redirect('CreateCustomer2')}}/>
                </View>
            </View>
        )
    }
}