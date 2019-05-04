import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    TouchableNativeFeedback,
    Dimensions,
    WebView
} from 'react-native';
import {
    Card,
    Thumbnail,
    Spinner
} from 'native-base';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import Axios from 'axios';

import { styles } from '../../assets/styles/Style';
import ImageSlider from 'react-native-image-slider';
import { config } from '../../config/Config';
import Data from '../../config/Data';
import { currencyFormat } from '../../config/Helper';

import ModalImageViewer from '../../components/ModalImageViewer';

const data = new Data();
export default class SparepartDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            isProgress: false,
            height: 0,
            isModalImageOpen: false,
        };

        this.getHeight = this.getHeight.bind(this);
        this.wrapHTML = this.wrapHTML.bind(this);
    }

    componentDidMount() {
        this.getDetail();
    }

    async getDetail() {
        const { state } = this.props.navigation;
        const itemID = state.params.itemID;

        this.setState({ isProgress: true });

        try {
            let response = await Axios.get(config.url + 'products/' + itemID);
            let item = response.data.data;

            this.setState({
                isProgress: false,
                item
            });
        } catch (error) {
            this.setState({ isProgress: false });
            console.error(error);
        }
    }

    getHeight(navState) {
        let height = !parseInt(navState.title) ? 0 : parseInt(navState.title) + 16;
        this.setState({ height });
    }

    wrapHTML(content) {
        let script = `
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                $(window).load(function() {
                    window.location.hash = 1;
                    document.title = document.body.clientHeight + 20;
                });
            });
        </script>`;

        let html = `<!DOCTYPE html><html><head<body>${content} ${script}</body></html>`;

        return html;
    }

    render() {
        let {
            item,
            height,
            isModalImageOpen
        } = this.state;

        let html = this.wrapHTML(item.description);
        let path = config.base_url + 'storage/products/' + item.photo;
        let image = item.photo ? { uri: path } : require('../../assets/images/bg.jpg');
        let price = item.type == 'pcs' ? item.price_piece : item.price_box;

        price = currencyFormat(price || 0);

        return (
            <View style={[styles.container]}>
                {this.state.isProgress &&
                    <View style={{ alignItems: 'center' }}>
                        <Spinner color="#333" />
                    </View>
                }
                {!this.state.isProgress &&
                    <View style={{ flex: 1 }}>
                        <ModalImageViewer 
                            images={[
                                image,
                                image,
                                image,
                            ]}
                            isOpen={isModalImageOpen}
                            onPressClose={() => {
                                this.setState({
                                    isModalImageOpen: false
                                });
                            }} />
                        <ScrollView style={[styles.content, localStyles.container]}>
                            {/*Image banner*/}
                            <View>
                                <ImageSlider
                                    images={[
                                        image,
                                        image,
                                        image,
                                    ]}
                                    style={{ width: '100%', height: 680 }}
                                    onPress={() => {
                                        this.setState({
                                            isModalImageOpen: true,
                                        });
                                    }}
                                />
                            </View>
                            {/*Content*/}
                            <View style={{ padding: 18 }}>
                                <View style={[{ flexDirection: 'row', flex: 1 }]}>
                                    {/*Col*/}
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.content_title, localStyles.title]}>{item.title}</Text>
                                        <Text style={[styles.content_body_font, localStyles.brand]}>{(item.product_brand) ? item.product_brand.name : ''}{'\n'}</Text>
                                        <Text style={localStyles.serialNumber}>S/N. {item.sn_product}</Text>
                                        <Text style={localStyles.noProduct}>Part No. {item.no_product}</Text>
                                    </View>
                                    {/*col*/}
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={[styles.content_title, localStyles.price]}>Rp. {price},-</Text>
                                        <Text style={localStyles.available}>{(item.is_stock_available == 0) ? 'Out of stock' : 'Available'}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginTop: 24 }}>
                                    <Text style={localStyles.descriptionCaption}>Description</Text>
                                    <WebView
                                        onNavigationStateChange={this.getHeight}
                                        automaticallyAdjustContentInsets={false}
                                        source={{ html }}
                                        style={{ height, backgroundColor: '#eee' }}
                                        scrollEnabled={true} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        padding: 0,
    },
    brand: {
        color: '#999'
    },
    title: {
        fontSize: 24,
    },
    serialNumber: {
        fontSize: 12,
        color: '#999',
    },
    noProduct: {
        fontSize: 12,
        color: '#999',
    },
    descriptionCaption: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#363636'
    },
    available: {
        color: '#999'
    },
    price: {
        color: '#ff9b00',
        fontSize: 18
    },
    buy: {
        width: Dimensions.get('window').width,
        height: 48,
        backgroundColor: '#ff9b00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyCaption: {
        fontSize: 18,
        color: 'white',
    }
});
