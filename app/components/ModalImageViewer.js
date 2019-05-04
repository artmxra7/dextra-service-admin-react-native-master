import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Image,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';

export default class ModalImageViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
        };

        this.handleLeft = this.handleLeft.bind(this);
        this.handleRight = this.handleRight.bind(this);
    }

    handleLeft() {
        const { imageIndex } = this.state;
        const { width } = Dimensions.get('screen');

        if (imageIndex == 0) return;

        this.scroll.scrollTo({ x: (imageIndex - 1) * width, animated: true });
        this.setState({ imageIndex: imageIndex - 1 });
    }

    handleRight() {
        const { images } = this.props;
        const { imageIndex } = this.state;
        const { width } = Dimensions.get('screen');

        if (imageIndex == images.length - 1) return;

        this.scroll.scrollTo({ x: (imageIndex + 1) * width, animated: true });
        this.setState({ imageIndex: imageIndex + 1 });
    }

    render() {
        let {
            isOpen,
            images,
            onPressClose,
        } = this.props;

        let { imageIndex } = this.state;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                onRequestClose={() => {}}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={onPressClose}>
                        <View style={styles.close}>
                            <Icon
                                name="close"
                                type="font-awesome"
                                color="white"
                                size={24} />
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView 
                        style={{ flex: 1 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ref={(scroll) => this.scroll = scroll}>
                        <View style={styles.content}>
                            {images.map((image, index) => {
                                return (
                                    <Image
                                        key={index} 
                                        source={image}
                                        style={styles.image} />
                                );
                            })}
                        </View>
                    </ScrollView>
                    <View style={styles.arrowContainer}>
                        <TouchableWithoutFeedback onPress={this.handleLeft}>
                            <View style={styles.arrow}>
                                <Icon
                                    name="arrow-left"
                                    type="font-awesome"
                                    color="white"
                                    size={24} />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{ color: 'white' }}>{imageIndex + 1} / {images.length}</Text>
                        <TouchableWithoutFeedback onPress={this.handleRight}>
                            <View style={styles.arrow}>
                                <Icon
                                    name="arrow-right"
                                    type="font-awesome"
                                    color="white"
                                    size={24} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        );
    }
}

ModalImageViewer.propTypes = {
    isOpen: PropTypes.bool,
    images: PropTypes.array,
    onPressClose: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    content: {
        height: Dimensions.get('screen').height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: Dimensions.get('screen').width,
    },
    arrowContainer: {
        height: 48,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrow: {
        paddingHorizontal: 16
    }
});
