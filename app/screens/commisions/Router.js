import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Commision from './Commision';
import History from './History';
import Proccess from './Proccess';
import Button from '../../components/Button';
import {styles} from '../../assets/styles/Style';

const TabCommision = TabNavigator ({
    Commision: {
        screen: Commision,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Waiting',
        },
    },
    History: {
        screen: History,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Completed',
        },
    },
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
            backgroundColor: 'transparent',
        },
        labelStyle: {
            fontWeight: 'bold',
        },
    },
});

export default TabCommision;
