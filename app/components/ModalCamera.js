'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Modal
} from 'react-native';
import { Icon } from 'react-native-elements';
import Camera from 'react-native-camera';
import PropTypes from 'prop-types';

export default class ModalCamera extends Component {
    constructor(props) {
        super(props);

        this.takePicture = this.takePicture.bind(this);
    }

    async takePicture() {
        let { 
            onPressCapture 
        } = this.props;

        const options = {};

        try {
            let captured = await this.camera.capture({metadata: options});
            onPressCapture(captured);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        let { 
            isOpen,
            onPressClose
        } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={isOpen}
                onRequestClose={() => {}}>
                <View style={styles.container}>
                    <Camera 
                        ref={(cam) => { this.camera = cam; }}
                        captureTarget={Camera.constants.CaptureTarget.temp}
                        style={styles.preview}
                        orientation={Camera.constants.Orientation.portrait}
                        flashMode={Camera.constants.FlashMode.off}
                        type={Camera.constants.Type.back}
                        aspect={Camera.constants.Aspect.fill}>
                        <TouchableWithoutFeedback
                            onPress={onPressClose}>
                            <View style={styles.close}>
                                <Icon name="close" color="#fff" size={32}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback 
                            onPress={this.takePicture}>
                            <View style={styles.capture}>
                                <Icon name="camera-alt" color="#fff" size={48}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </Camera>
                </View>
            </Modal>
        );
    }
}

ModalCamera.propTypes = {
    isOpen: PropTypes.bool,
    onPressCapture: PropTypes.func,
    onPressClose: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    close: {
        position: 'absolute',
        top: 24,
        right: 24,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3
    },
    capture: {
        alignItems: 'center',
        marginBottom: 96,
    }
});
