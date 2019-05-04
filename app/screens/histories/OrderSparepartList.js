import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Spinner } from "native-base";
import { connect } from "react-redux";

import SparepartHistoryItem from "../../components/SparepartHistoryItem";
import { styles } from "../../assets/styles/Style";
import Data from "../../config/Data";

import { fetchOrders } from "../../store/orders/Actions";
import { fetchCurrentOrder } from "../../store/currentOrder/Actions";
import { setCurrentOrderID } from "../../store/currentOrderID/Actions";

const data = new Data();

class OrderSparepartList extends Component {
  constructor(props) {
    super(props);

    this.detail = this.detail.bind(this);
  }

  componentDidMount() {
    const { fetchHistories } = this.props;

    fetchHistories();
  }

  detail(historyID) {
    const { navigation, selectOrder, loadOrder } = this.props;

    selectOrder(historyID);
    loadOrder();
    navigation.navigate("SparepartListDetail", { historyID });
  }

  render() {
    const { histories, isProgress, fetchHistories } = this.props;

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[styles.content, { padding: 2, backgroundColor: "#eee" }]}
          refreshControl={
            <RefreshControl
              onRefresh={fetchHistories}
              refreshing={isProgress}
            />
          }
        >
          {isProgress && (
            <View style={{ alignItems: "center" }}>
              <Spinner color="#333" />
            </View>
          )}
          {!isProgress && (
            <View>
              {histories.map((history, index) => {
                return (
                  <SparepartHistoryItem
                    key={index}
                    date={history.created_at}
                    totalPrice={history.total_price}
                    status={history.status}
                    onPress={() => this.detail(history.id)}
                  />
                );
              })}
              {histories.length === 0 && (
                <Text style={styles.no_data}>No orders were found !</Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ orders }) => ({
  histories: orders.data,
  isProgress: orders.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchHistories: () => dispatch(fetchOrders()),
  selectOrder: orderID => dispatch(setCurrentOrderID(orderID)),
  loadOrder: () => dispatch(fetchCurrentOrder())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSparepartList);
