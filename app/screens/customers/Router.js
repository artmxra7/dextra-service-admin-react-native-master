import React, {Component} from 'react';
import {
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native'
import { Icon } from 'native-base';
import {
    TabNavigator,
    StackNavigator
} from 'react-navigation';
import Customer from './Customer';
import Quotation from './Quotation';
import Purchase from './Purchase';
import CustomerDetail from './CustomerDetail';
import PurchaseDetail from './PurchaseDetail';
import {styles} from '../../assets/styles/Style';
import Drawer from 'react-native-drawer';

export default class Router extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RouterDetail/>
        );
    }
}

const Route = new Router();

export const CustomerRouter = TabNavigator({
    Customer: {
        screen: Customer,
        navigationOptions: {
            tabBarLabel: 'Cust List',
        }
    },
    Quotation: {
        screen: Quotation,
        navigationOptions: {
            tabBarLabel: 'Quotation',
        }
    },
    Purchase: {
        screen: Purchase,
        navigationOptions: {
            tabBarLabel: 'Purchase'
        }
    }
  },{
    tabBarOptions: {
        style: {
            backgroundColor: '#fff',
        },
        activeTintColor: '#f39c12',
        activeBackgroundColor: 'red',
        inactiveTintColor: '#3E3C3C',
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
        labelStyle: {
            fontWeight: 'bold'
        }
    }
})

export const RouterDetail = StackNavigator({
    CustomerRouter: {
        screen: CustomerRouter,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Customer',
        }
    },
    CustomerDetail: {
        screen: CustomerDetail,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Customer Detail',
        }
    },
    PurchaseDetail: {
        screen: PurchaseDetail,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Purchase Detail',
        }
    }
})
