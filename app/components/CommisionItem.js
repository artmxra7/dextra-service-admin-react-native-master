import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native';

import List from './List';
import {styles} from '../assets/styles/Style';
import { currencyFormat, calculateTotalPrice } from '../config/Helper';

export default class CommisionItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            customer_name,
            date,
            amount,
        } = this.props;

        amount = currencyFormat(amount);

        return (
            <TouchableOpacity
                onPress={onPress}>
                <List>
                    <View style={[styles.col_list,{flexDirection:'row',flex:1}]}>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:4,paddingTop:8,marginRight:4,paddingBottom:8, flex:1}}>
                            <View style={{flexDirection:'column', flex:1.5}}>
                                <Text style={[styles.font_list,{fontSize:14}]}>{customer_name}</Text>
                                <Text style={[styles.font_list,{fontSize:12}]}>{date}</Text>
                            </View>
                            <View style={{flexDirection:'column',flex:1.5, alignItems:'flex-end'}}>
                                <Text style={[styles.content_body_heading_font,{fontSize:16}]}>Rp. {amount},-</Text>
                            </View>
                        </View>
                    </View>
                </List>
            </TouchableOpacity>
        );
    }
}
