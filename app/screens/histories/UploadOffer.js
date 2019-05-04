import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import {
    Card,
    Thumbnail,
    Spinner
} from 'native-base';
import { Icon } from 'react-native-elements';
import Axios from 'axios';

import Ref from '../../components/Ref';
import Input from '../../components/Input';
import CurrencyInput from '../../components/CurrencyInput';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';
import Switch from '../../components/Switch';
import ButtonCount from '../../components/ButtonCount';
import ButtonRadius from '../../components/ButtonRadius';
import BuyButton from '../../components/BuyButton';
import SparepartHistoryItem from '../../components/SparepartHistoryItem';
import { styles } from '../../assets/styles/Style';
import Link from '../../components/Link';
import List from '../../components/List';
import Data from '../../config/Data';
import { Feed } from '../../config/Data';
import { config } from '../../config/Config';
import Modal from 'react-native-modal';
import FilePicker from 'NativeModules';

import { NavigationActions } from 'react-navigation';

const data = new Data();

export default class UploadOffer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historyID: '',
            type: '',
            file: '',
            fileURI: '',
            price: '',
            isProgress: false,
        };

        this.submit = this.submit.bind(this);
        this.selectPDF = this.selectPDF.bind(this);
        this.removePDF = this.removePDF.bind(this);
        this.viewPDF = this.viewPDF.bind(this);
    }

    async componentDidMount() {
        let { state } = this.props.navigation;
        let { historyID, type } = state.params;

        this.setState({ historyID, type });
    }

    async submit() {
        let {
            historyID,
            file,
            fileURI,
            price,
            isProgress,
            type,
        } = this.state;

        try {
            let form = new FormData();
            let isHasEmpty = !historyID
                || !file
                || !price;

            if (isHasEmpty) {
                alert('All field is required');
            } else {
                if (isProgress) return;

                this.setState({ isProgress: true });

                let fieldID = '';
                let urlPath = '';

                if (type == 'sparepart') {
                    fieldID = 'order_id';
                    urlPath = 'purchases';
                } else {
                    fieldID = 'job_id';
                    urlPath = 'quotations';
                }

                form.append("FormData", true);
                form.append(fieldID, historyID);
                form.append('price', price);

                let file = {
                    uri: fileURI,
                    type: 'application/pdf',
                    name: 'file.pdf',
                };

                form.append("Content-Type", 'application/pdf');
                form.append('file', file);

                let response = await Axios.post(config.url + urlPath, form);

                alert('Saved data success');

                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'FeedAdmin' }),
                    ]
                });

                this.props.navigation.dispatch(resetAction);
            }
        } catch (error) {
            console.error(error.response);
        }
    }

    selectPDF() {
        FilePicker.FilePickerManager.showFilePicker(null, (response) => {
            if (response.error) {
                alert('Error: ', response.error);
            } else if (response.didCancel) {
            } else {
                let extension = response.path.split('.');
                extension = extension[extension.length - 1];

                if (extension == 'pdf') {
                    this.setState({
                        file: response.path,
                        fileURI: response.uri,
                    });
                } else {
                    console.warn('You should upload pdf file !');
                    alert('You should upload pdf file !');
                }
            }
        });
    }

    removePDF() {
        this.setState({ file: '' });
        alert('Select PDF Offer again');
    }

    viewPDF() {
        let { file } = this.state;
        let { navigation } = this.props;

        navigation.navigate('OfferViewer', { filePath: file });
    }

    render() {
        let {
            file,
            price,
            isProgress
        } = this.state;

        return (
            <View style={[styles.container]}>
                <Modal
                    style={{ height: 40 }}
                    isVisible={isProgress}>
                    <View style={{ backgroundColor: '#fff', alignItems: 'center', padding: 20 }}>
                        <Spinner color="#333" />
                    </View>
                </Modal>
                <ScrollView style={[styles.content]}>
                    <View>
                        {file == '' &&
                            <View style={{ marginBottom: 10 }}>
                                <Button
                                    lowerCase={true}
                                    text="Select PDF Offer"
                                    onPress={() => this.selectPDF()} />
                            </View>
                        }
                        {file != '' &&
                            <View style={{ marginBottom: 10 }}>
                                <Button
                                    lowerCase={true}
                                    text="Remove PDF Offer"
                                    onPress={() => this.removePDF()}
                                    style={{ marginBottom: 10 }} />
                                <Button
                                    lowerCase={true}
                                    text="View PDF Offer"
                                    onPress={() => this.viewPDF()} />
                            </View>
                        }
                        <CurrencyInput
                            placeholder="Total Price"
                            value={price}
                            onChangeText={(text) => this.setState({ price: text })} />
                    </View>
                    <Button
                        lowerCase={true}
                        text="Submit Offer"
                        onPress={() => this.submit()} />
                    <View style={{ height: 96 }}></View>
                </ScrollView>
            </View>
        )
    }
}
