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

export default class MechanicApprovalItem extends Component {
    constructor(props) {
        super(props);
    }

    getStatusColor(status) {
        switch (status) {
            case 'approved':
                return '#38af28';
            case 'rejected':
                return '#b72f2f';
            default:
                return '#ff9000';
        }
    }

    render() {
        let {
            name,
            phone,
            status,
            onPress
        } = this.props;

        let statusColor = this.getStatusColor(status);

        return (
            <View style={styles.container}>
                <View style={{ marginRight: 16 }}>
                    <Thumbnail source={require('../assets/images/badge.jpg')} />
                </View>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                    
                    {status == 'waiting' ? (
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <Text 
                                style={{ color: '#38af28', fontSize: 9, paddingVertical: 8, marginRight: 16}}
                                onPress={() => onPress('approved')}>
                                APPROVED
                            </Text>
                            <Text 
                                style={{ color: '#b72f2f', fontSize: 9, paddingVertical: 8}}
                                onPress={() => onPress('rejected')}>
                                REJECTED
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.status, { backgroundColor: statusColor }]}>
                            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

MechanicApprovalItem.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    status: PropTypes.oneOf(['waiting', 'approved', 'rejected']),
    onPress: PropTypes.func,
};

MechanicApprovalItem.defaultProps = {
    phone: 'Empty Phone Number',
    status: 'waiting'
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
