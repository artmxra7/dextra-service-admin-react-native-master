import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';
import {
    Spinner
} from 'native-base';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import moment from 'moment';

import Button from '../../components/Button';
import { styles } from '../../assets/styles/Style';
import Data from '../../config/Data';
import { Feed } from '../../config/Data';
import { config } from '../../config/Config';

export default class OfferViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            filePath: '',
        };
    }

    componentDidMount() {
        let { navigation } = this.props;
        let { state } = navigation;
        let { filePath } = state.params;

        if (state.params.downloadable) {
            this.download();
        }else {
            this.setState({filePath, isShow: true});
        }
    }

    download() {
        let { navigation } = this.props;
        let { state } = navigation;
        let { downloadable } = state.params;

        const timestamp = moment(downloadable.created_at).unix();
        const fileUrl = config.base_url + 'attachments/offers/' + downloadable.file;
        const downloadPath = RNFS.PicturesDirectoryPath + '/Dextra/Offers';
        const filename = 'offer_' + timestamp + '.pdf';

        RNFS.mkdir(downloadPath)
            .then(() => {
                RNFS.downloadFile({
                    fromUrl: fileUrl,
                    toFile: `${downloadPath}/${filename}`,
                }).promise.then((response) => {
                    this.setState({
                        isShow: true,
                        filePath: `${downloadPath}/${filename}`
                    });
                });
            });
    }

    render() {
        let {
            isShow,
            filePath
        } = this.state;

        return (
            <View style={[styles.container]}>
                {isShow ? (
                    <PDFView
                        ref={(pdf) => { this.pdfView = pdf; }}
                        src={filePath}
                        style={localStyles.pdf} />
                ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ marginBottom: 16 }}>Downloading...</Text>
                        <Spinner color="#333" />
                    </View>
                )}
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    pdf: {
        flex: 1
    },
});
