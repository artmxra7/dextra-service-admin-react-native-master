import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    ScrollView,
    Alert,
    AsyncStorage
} from 'react-native';
import Axios from 'axios';
import { Spinner } from 'native-base';
import { styles } from '../../assets/styles/Style';
import Data from '../../config/Data';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import {config} from '../../config/Config';

import { NavigationActions } from 'react-navigation';

const data = new Data();
export default class Intro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isProgress: false,
        };
    }

    redirect(route) {
        this.props.navigation.navigate(route);
    }

    async componentDidMount() {
        let {
            navigation
        } = this.props;

        const token = await data.select('api_token');
        const user = await data.select('user');

        if (user) {
            this.setState({ isProgress: true });
            let routeRedirect = '';
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            try {
                let response = await Axios.get(config.url + 'news');
                routeRedirect = 'FeedAdmin';
            } catch (error) {
                routeRedirect = 'Login';
                await data.insert('api_token', null);
                await data.insert('user', null);
                alert('You\' logged out, please login again.');
            }

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: routeRedirect }),
                ]
            });

            navigation.dispatch(resetAction);
        }
    }

    render() {
        return (
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
                    <Image
                        style={styles.bg_excavators}
                        source={require('../../assets/images/bg-excavators.png')}
                    />
                    <View>
                        <Text style={styles.content_text}>
                            Aplikasi untuk pemesanan jasa Mekanik, Suku Cadang, dan Alat Berat yang Terpercaya
                        </Text>
                    </View>
                    <View style={styles.button_container}>
                        <Button text="Login" onPress={() => { this.redirect('Login') }} />
                    </View>
                </View>
                <Modal
                    style={{ height: 40 }}
                    isVisible={this.state.isProgress}
                >
                    <View style={{ backgroundColor: '#fff', alignItems: 'center', padding: 20 }}>
                        <Spinner color="#333" />
                    </View>
                </Modal>
            </View>
        );
    }
}
