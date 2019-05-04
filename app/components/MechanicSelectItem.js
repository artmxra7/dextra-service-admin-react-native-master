import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
    Thumbnail
} from 'native-base';

export default class MechanicSelectItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            name,
            phone,
            isSelected,
            onPress
        } = this.props;

        return (
            <TouchableNativeFeedback onPress={onPress}>
                <View style={styles.container}>
                    <View style={{ marginRight: 16 }}>
                        <Thumbnail source={require('../assets/images/badge.jpg')} />
                    </View>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.phone}>{phone}</Text>

                        {isSelected && 
                            <View style={[styles.status, { backgroundColor: '#38af28' }]}>
                                <Text style={styles.statusText}>SELECTED</Text>
                            </View>
                        }
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

MechanicSelectItem.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
};

MechanicSelectItem.defaultProps = {
    phone: 'Empty Phone Number',
    isSelected: false,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee'
    },
    name: {
        fontWeight: 'bold',
    },
    phone: {
        color: '#bbb'
    },
    status: {
        backgroundColor: '#ff9000',
        paddingVertical: 2,
        width: 64,
        marginTop: 8,
        borderRadius: 2
    },
    statusText: {
        color: 'white',
        fontSize: 9,
        textAlign: 'center'
    }
});
