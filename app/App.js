import React, { Component } from "react";
import { Stack } from "./config/Router";
import FCM, { FCMEvent } from "react-native-fcm";
import { Provider } from "react-redux";
import moment from "moment";
import "moment/locale/id";

import store from "./store/Store";
import { fetchOrders } from "./store/orders/Actions";
import { fetchCurrentOrder } from "./store/currentOrder/Actions";
import { fetchCurrentJob } from "./store/currentJob/Actions";

moment.locale("id");

export default class App extends Component {
  componentDidMount() {
    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
      if (notif.data) {
        const data = JSON.parse(notif.data);

        switch (data.notification_type) {
          case "CREATE_ORDER":
            // Fetch orders data for OrderSparepartList page
            store.dispatch(fetchOrders());
            break;

          case "UPDATE_ORDER":
          case "CREATE_PAYMENT":
            // Fetch current order data for SparepartListDetail page
            store.dispatch(fetchCurrentOrder());
            break;

          case "CREATE_JOB_MECHANIC":
            // Fetch current job for JobDetail page
            store.dispatch(fetchCurrentJob());
            break;

          default:
            break;
        }
      }
    });
  }

  componentWillUnmount() {
    this.notificationListener.remove();
  }

  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}
