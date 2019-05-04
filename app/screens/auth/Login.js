import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    ScrollView,
    Alert
} from 'react-native';
import Axios from 'axios';
import FCM, { FCMEvent } from 'react-native-fcm';
import { Spinner } from 'native-base';
import { styles } from '../../assets/styles/Style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Ref from '../../components/Ref';
import Data from '../../config/Data';
import Modal from 'react-native-modal';
import { config } from '../../config/Config';

const data = new Data();
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            email: '',
            error: [],
            modalVisible: false,
        };
    }

    redirect(route) {
        this.props.navigation.navigate(route);
    }

    login() {
        this.feedPage();
    }

    async checkConnection() {
        try {
            let response = await fetch(config.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
            });

            this.sendLogin();
        } catch (error) {
            Alert.alert('Pastikan anda terhubung dengan internet');
        }
    }

    async sendLogin() {
        this.setState({ modalVisible: true });

        try {
            let response = await fetch(config.url + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
            });

            let res = await response.json();

            if (res.success == false) {
                let error = JSON.stringify(res);
                throw error;
            }

            this.setState({ modalVisible: false });

            if (res.data.user) {
                if (res.data.user.role == 'admin') {
                    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.api_token;

                    let fcm_token = await FCM.getFCMToken();
                    res.data.user.fcm_token = fcm_token;
                    
                    await Axios.post(config.url + 'fcm-token/' + res.data.user.id, { fcm_token });
                    await data.insert('api_token', res.data.api_token);
                    await data.insert('user', res.data.user);

                    Alert.alert(res.message);

                    this.redirect('FeedAdmin');
                } else {
                    Alert.alert('Failed login. Not admin user');
                }
            }
        } catch (errors) {
            formErrors = JSON.parse(errors)
            errorsArray = []

            if (formErrors.data != null) {
                for (var key in formErrors.data) {
                    if (formErrors.data[key].length >= 1) {
                        formErrors.data[key].map((error) => errorsArray.push(`${error}`));
                    } else {
                        errorsArray.push('Password atau email anda salah');
                    }
                }
            } else {
                errorsArray.push("Password atau email anda salah");
            }

            this.setState({ modalVisible: false });
            this.setState({ error: errorsArray });
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#ffb643' }}>
                <View style={{ backgroundColor: '#fff' }}>
                    <Errors errors={this.state.error} />
                </View>
                <View style={styles.container}>
                    <View style={styles.header}>
                        {/*logo*/}
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/logo.png')}
                            resizeMode="contain"
                        />
                        {/*header text*/}
                        <Text style={styles.header_text}>
                            {/*content text*/}
                            <Text style={styles.content_text}>Selamat datang di {'\n'}</Text>
                            {/*header text big*/}
                            <Text style={styles.header_text_big}>D’extratama Apps {'\n'}</Text>
                            {/*header text small*/}
                            <Text style={styles.header_text_small}>By PT Dextratama Nitya
                            Sanjaya</Text>
                        </Text>
                    </View>
                    {/*Content*/}
                    <View style={styles.content}>
                        {/*input*/}
                        <View>
                            <Input
                                placeholder="Email"
                                keyboardType="email-address"
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                            <Input
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', marginBottom: 20, flexDirection: 'row' }}>
                            <Text>Lupa password ? </Text><Ref text="klik disini" color="#ffff" onPress={() => { this.redirect('Reset') }} />
                        </View>
                        <View style={styles.button_container}>
                            <Button text="Login" onPress={() => { this.checkConnection() }} />
                        </View>
                    </View>
                </View>
                <Modal
                    style={{ height: 40 }}
                    isVisible={this.state.modalVisible}
                >
                    <View style={{ backgroundColor: '#fff', alignItems: 'center', padding: 20 }}>
                        <Spinner color="#333" />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const Errors = (props) => {
    return (
        <View>
            {props.errors.map((error, i) => <Text key={i} style={{ textAlign: 'center', color: 'red' }}> {error} </Text>)}
        </View>
    )
}
