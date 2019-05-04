'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import {
    Spinner,
} from 'native-base';

export default class ModalLoading extends Component {
    render() {
        let { 
            isOpen,
        } = this.props;

        return (
            <Modal
                style={{ height: 40 }}
                isVisible={isOpen}>
                <View style={{ backgroundColor: '#fff', alignItems: 'center', padding: 20 }}>
                    <Spinner color="#333" />
                </View>
            </Modal>
        );
    }
}

ModalLoading.propTypes = {
    isOpen: PropTypes.bool,
};
