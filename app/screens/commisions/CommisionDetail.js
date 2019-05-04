import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    TextInput,
    DatePickerAndroid,
    Image
} from 'react-native';
import {
    Thumbnail,
    Spinner
} from 'native-base';

import { Icon } from 'react-native-elements'
import _ from 'lodash';
import MapView from 'react-native-maps';
import Modal from 'react-native-modal';
import moment from 'moment';
import Axios from 'axios';

import { styles } from '../../assets/styles/Style';
import Link from '../../components/Link';
import List from '../../components/List';
import Button from '../../components/Button';
import JobDayItem from '../../components/JobDayItem';
import Input from '../../components/Input';
import MechanicApprovalItem from '../../components/MechanicApprovalItem';
import MechanicSelectItem from '../../components/MechanicSelectItem';
import ModalCamera from '../../components/ModalCamera';
import ModalLoading from '../../components/ModalLoading';
import { config } from '../../config/Config';
import { currencyFormat } from '../../config/Helper';
import Data from '../../config/Data';

const data = new Data();

export default class CommisionDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            withdraw: {},
            isProgress: false,
            isCameraOpen: false,
            isLoading: false,
        };

        this.openCamera = this.openCamera.bind(this);
        this.closeCamera = this.closeCamera.bind(this);
        this.approve = this.approve.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const { state } = this.props.navigation;
        const { withdrawID } = state.params;

        this.setState({ isProgress: true });

        try {
            let response = await Axios.get(config.url + 'withdraws/' + withdrawID);
            let withdraw = response.data.data;

            this.setState({
                isProgress: false,
                withdraw,
            });
        } catch (error) {
            this.setState({ isProgress: false });
            console.error(error.response);
        }
    }

    openCamera() {
        this.setState({ isCameraOpen: true });
    }

    closeCamera() {
        this.setState({ isCameraOpen: false });
    }

    async approve(photo) {
        const { state } = this.props.navigation;
        const { withdrawID } = state.params;
        let form = new FormData();

        let file = {
            uri: photo.path,
            type: 'image/*',
            name: 'file',
        };

        form.append('_method', 'PATCH');
        form.append('status', 'completed');
        form.append('photo', file);

        this.setState({
            isCameraOpen: false,
            isLoading: true,
        });

        try {
            let response = await Axios.post(config.url + 'withdraws/' + withdrawID, form);
            let withdraw = response.data.data;

            this.setState({
                isLoading: false,
                withdraw,
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        let {
            isProgress,
            isCameraOpen,
            isLoading,
            withdraw,
        } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView style={[styles.content, { padding: 2, backgroundColor: '#eee' }]}>
                    {isProgress &&
                        <View style={{ alignItems: 'center' }}>
                            <Spinner color="#333" />
                        </View>
                    }
                    {!isProgress &&
                        <View style={{ padding: 18 }}>
                            <View style={{ marginVertical: 36 }}>
                                <Text style={[styles.content_body_font, localStyles.label, { textAlign: 'center' }]}>Amount</Text>
                                <Text style={[styles.content_body_font, localStyles.amount]}>Rp {currencyFormat(withdraw.amount || 0)},-</Text>
                            </View>
                            <View style={{ marginBottom: 24 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.content_body_font, localStyles.label]}>
                                            Bank Name
                                        </Text>
                                        <Text style={[styles.content_body_font, localStyles.value]}>
                                            {withdraw.bank_name}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.content_body_font, localStyles.label]}>
                                            Bank Account
                                        </Text>
                                        <Text style={[styles.content_body_font, localStyles.value]}>
                                        {withdraw.bank_account}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 48 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.content_body_font, localStyles.label]}>A/N</Text>
                                        <Text style={[styles.content_body_font, localStyles.value]}>{withdraw.bank_person_name}</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.content_body_font, localStyles.label]}>Status</Text>
                                        <Text style={[styles.content_body_font, localStyles.value]}>{withdraw.status}</Text>
                                    </View>
                                </View>
                            </View>
                            {withdraw.status == 'completed' &&
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.content_body_font, localStyles.label]}>Payment Photo</Text>
                                    <Image
                                        source={{ uri: config.url + 'attachments/withdraws' + withdraw.photo }}
                                        style={localStyles.photo} />
                                </View>
                            }
                        </View>
                    }
                </ScrollView>

                {withdraw.status == 'waiting' && 
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableNativeFeedback onPress={this.openCamera}>
                            <View style={localStyles.bottomButton}>
                                <Text style={localStyles.bottomText}>Approve</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                }

                <ModalCamera 
                    isOpen={isCameraOpen}
                    onPressClose={this.closeCamera}
                    onPressCapture={this.approve} />
                
                <ModalLoading isOpen={isLoading} />
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    bottomMenu: {
        width: Dimensions.get('window').width,
        height: 48,
        flexDirection: 'row'
    },
    bottomButton: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffb643',
        borderRightWidth: 0.5,
        borderRightColor: '#e5a43d',
        borderLeftWidth: 0.5,
        borderLeftColor: '#e5a43d'
    },
    bottomText: {
        fontSize: 12,
        color: 'white',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16,
        color: '#555'
    },
    largeButton: {
        width: '100%',
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363636',
        marginTop: 12,
        borderRadius: 4,

    },
    largeButtonText: {
        fontSize: 14,
        color: 'white'
    },
    close: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        color: 'black'
    },
    empty: {
        textAlign: 'center',
        marginTop: 48,
    },
    amount: {
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    photo: {
        width: 192,
        height: 192,
        marginTop: 16,
        resizeMode: 'cover'
    }
});
