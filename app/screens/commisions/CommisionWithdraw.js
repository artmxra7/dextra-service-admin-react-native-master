import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { styles } from '../../assets/styles/Style';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default class CommisionWithdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bank_account: '',
            bank_person_name: '',
            bank_name: '',
            amount: '',
        }
    }

    render() {
        return (
            <View style={styles.content}>
                {/*Header*/}
                <View style={{alignItems:'center', marginBottom:18}}>
                    <Text style={{fontWeight:'bold', color:'#363636'}}>Commision Withdraw</Text>
                </View>
                {/*Content*/}
                <View>
                    <Input
                      placeholder="No. Rekening"
                      keyboardType="numeric"
                      onChangeText={(text) => this.setState({bank_account:text})}
                    />
                    <Input
                      placeholder="Nama Pemilik Akun"
                      autoCapitalize="words"
                      onChangeText={(text) => this.setState({bank_person_name:text})}
                    />
                    <Input
                      placeholder="Nama Bank"
                      autoCapitalize="words"
                      onChangeText={(text) => this.setState({bank_name:text})}
                    />
                    <Input
                      placeholder="Nominal Withdraw"
                      keyboardType="numeric"
                      onChangeText={(text) => this.setState({amount:text})}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}>
                    <View style={{width:80}}><Button text="Submit" lowerCase={true} onPress={() => alert('submit')}/></View>
                </View>
            </View>
        );
    }
}
