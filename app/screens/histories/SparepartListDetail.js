import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  Dimensions
} from "react-native";
import { connect } from "react-redux";

import Axios from "axios";
import moment from "moment";

import SparepartOrderItem from "../../components/SparepartOrderItem";
import { styles } from "../../assets/styles/Style";
import Data from "../../config/Data";
import { config } from "../../config/Config";
import { currencyFormat, formatStatus } from "../../config/Helper";
import { fetchCurrentOrder } from "../../store/currentOrder/Actions";

const data = new Data();

class SparepartListDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api_token: null,
      user: null,
      detail: {},
      purchase: {},
      payment: {},
      items: []
    };

    this.cancel = this.cancel.bind(this);
    this.toItemDetail = this.toItemDetail.bind(this);
    this.toUploadOffer = this.toUploadOffer.bind(this);
    this.toViewOffer = this.toViewOffer.bind(this);
    this.toConfirmPayment = this.toConfirmPayment.bind(this);
    this.toStartDelivery = this.toStartDelivery.bind(this);
    this.toOrderFinish = this.toOrderFinish.bind(this);
  }

  async componentDidMount() {
    const api_token = await data.select("api_token");
    const user = await data.select("user");

    this.setState({ api_token, user });
  }

  componentWillReceiveProps(nextProps) {
    this.getDetail(nextProps);
  }

  getDetail(nextProps) {
    const { currentOrder: detail } = nextProps;

    let purchase = { ...detail.purchase };
    let payment = { ...detail.payment };
    let items = [...detail.order_products];

    delete detail.order_products;
    delete detail.purchase;
    delete detail.payment;

    this.setState({
      detail,
      items,
      purchase,
      payment
    });
  }

  cart() {
    this.props.navigation.navigate("Cart");
  }

  toViewOffer() {
    let { navigation } = this.props;
    let { purchase } = this.state;

    navigation.navigate("OfferViewer", { downloadable: purchase });
  }

  async toConfirmPayment() {
    let { state } = this.props.navigation;
    let historyID = state.params.historyID;

    try {
      let response = await Axios.post(config.url + "orders/" + historyID, {
        _method: "PATCH",
        status: "PAYMENT_CONFIRMED"
      });

      await Axios.post(config.url + "payments/" + this.state.payment.id, {
        _method: "PATCH",
        status: "confirmed"
      });

      let detail = { ...response.data.data };
      let purchase = { ...detail.purchase };
      let payment = { ...detail.payment };
      let items = [...detail.order_products];

      delete detail.order_products;
      delete detail.purchase;
      delete detail.payment;

      this.setState({
        detail,
        items,
        purchase,
        payment
      });
    } catch (error) {
      console.error(error);
    }
  }

  async toStartDelivery() {
    let { state } = this.props.navigation;
    let historyID = state.params.historyID;

    try {
      let response = await Axios.post(config.url + "orders/" + historyID, {
        _method: "PATCH",
        status: "DELIVERY_PROCESS"
      });

      let detail = { ...response.data.data };
      let purchase = { ...detail.purchase };
      let payment = { ...detail.payment };
      let items = [...detail.order_products];

      delete detail.order_products;
      delete detail.purchase;
      delete detail.payment;

      this.setState({
        detail,
        items,
        purchase,
        payment
      });
    } catch (error) {
      console.error(error);
    }
  }

  async toOrderFinish() {
    let { state } = this.props.navigation;
    let historyID = state.params.historyID;

    try {
      let response = await Axios.post(config.url + "orders/" + historyID, {
        _method: "PATCH",
        status: "ORDER_FINISHED"
      });

      let detail = { ...response.data.data };
      let purchase = { ...detail.purchase };
      let payment = { ...detail.payment };
      let items = [...detail.order_products];

      delete detail.order_products;
      delete detail.purchase;
      delete detail.payment;

      this.setState({
        detail,
        items,
        purchase,
        payment
      });
    } catch (error) {
      console.error(error);
    }
  }

  toItemDetail(itemID) {
    const { navigate } = this.props.navigation;
    navigate("SparepartDetail", { itemID });
  }

  toUploadOffer(historyID) {
    const { navigate } = this.props.navigation;
    navigate("UploadOffer", { historyID, type: "sparepart" });
  }

  async cancel() {
    let { state } = this.props.navigation;
    let historyID = state.params.historyID;

    const token = await data.select("api_token");

    try {
      let response = await fetch(config.url + "orders/" + historyID, {
        method: "PUT",
        headers: {
          "Content-Type": "aplication/json",
          accept: "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          status: "ORDER_CANCELED"
        })
      });

      response = await response.json();
      let detail = { ...response.data };
      let items = [...detail.order_products];

      delete detail.order_products;

      this.setState({
        detail,
        items
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let { detail, items, payment } = this.state;
    let status = formatStatus(detail.status);
    let date = moment(detail.created_at).format("dddd, Do MMM YYYY | h:mm:ss");

    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <ScrollView
          style={[styles.content, { padding: 2, backgroundColor: "#eee" }]}
        >
          <View>
            {items.map((item, index) => {
              return (
                <SparepartOrderItem
                  key={index}
                  onDetail={() => this.openDetail(item.id)}
                  name={item.product.title}
                  brand={item.product.product_brand.name}
                  photo={item.product.photo}
                  quantity={item.qty}
                  price={item.price}
                  onPress={() => this.toItemDetail(item.product.id)}
                />
              );
            })}
          </View>
          <View style={{ padding: 18 }}>
            <View style={{ marginBottom: 8 }}>
              <View>
                <Text
                  style={[
                    styles.content_body_font,
                    { fontSize: 16, fontWeight: "bold" }
                  ]}
                >
                  Total
                </Text>
                <Text
                  style={[
                    styles.content_body_font,
                    { fontSize: 24, fontWeight: "bold" }
                  ]}
                >
                  Rp. {currencyFormat(detail.total_price || 0)},-
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 24 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontWeight: "bold", fontSize: 12 }
                    ]}
                  >
                    Order Date
                  </Text>
                  <Text style={[styles.content_body_font, { color: "#888" }]}>
                    {date}
                  </Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontSize: 12, fontWeight: "bold" }
                    ]}
                  >
                    Status Order
                  </Text>
                  <Text style={[styles.content_body_font, { color: "#888" }]}>
                    {status}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 16 }}>
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontWeight: "bold", fontSize: 12 }
                    ]}
                  >
                    Shipping
                  </Text>
                  <Text style={[styles.content_body_font, { color: "#888" }]}>
                    {detail.address}
                  </Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontSize: 12, fontWeight: "bold" }
                    ]}
                  >
                    City
                  </Text>
                  <Text style={[styles.content_body_font, { color: "#888" }]}>
                    {detail.city}
                  </Text>
                </View>
              </View>
            </View>
            {payment.amount && (
              <View style={{ marginTop: 24 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontWeight: "bold", fontSize: 12 }
                      ]}
                    >
                      Amount Transfer
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      Rp. {currencyFormat(payment.amount || 0)},-
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontSize: 12, fontWeight: "bold" }
                      ]}
                    >
                      Bank Name
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      {payment.bank_name}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 16 }}>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontWeight: "bold", fontSize: 12 }
                      ]}
                    >
                      Bank Account
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      {payment.bank_account}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontSize: 12, fontWeight: "bold" }
                      ]}
                    >
                      Bank Person Name
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      {payment.bank_person_name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        {detail.status !== "ORDER_CANCELED" &&
          detail.status !== "DELIVERY_PROCESS" && (
            <View style={localStyles.bottomMenu}>
              {detail.status == "WAITING_OFFER" && (
                <TouchableNativeFeedback
                  onPress={() => this.toUploadOffer(detail.id)}
                >
                  <View style={localStyles.bottomButton}>
                    <Text style={localStyles.bottomText}>Upload Offer</Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              {(detail.status == "OFFER_RECEIVED" ||
                detail.status == "OFFER_AGREED" ||
                detail.status == "OFFER_REJECTED" ||
                detail.status == "OFFER_AGREED") && (
                <TouchableNativeFeedback onPress={() => this.toViewOffer()}>
                  <View style={localStyles.bottomButton}>
                    <Text style={localStyles.bottomText}>View Offer</Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              {detail.status == "WAITING_PAYMENT_CONFIRMED" && (
                <TouchableNativeFeedback
                  onPress={() => this.toConfirmPayment()}
                >
                  <View style={localStyles.bottomButton}>
                    <Text style={localStyles.bottomText}>Confirm Payment</Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              {detail.status == "PAYMENT_CONFIRMED" && (
                <TouchableNativeFeedback onPress={() => this.toStartDelivery()}>
                  <View style={localStyles.bottomButton}>
                    <Text style={localStyles.bottomText}>Start Delivery</Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              {detail.status == "DELIVERY_RECEIVED" && (
                <TouchableNativeFeedback onPress={() => this.toOrderFinish()}>
                  <View style={localStyles.bottomButton}>
                    <Text style={localStyles.bottomText}>Order Finish</Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              {detail.status == "ORDER_FINISHED" && (
                <TouchableNativeFeedback onPress={() => this.toViewOffer()}>
                  <View style={localStyles.bottomButton}>
                    <Text style={localStyles.bottomText}>View Offer</Text>
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
          )}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  bottomMenu: {
    width: Dimensions.get("window").width,
    height: 48,
    flexDirection: "row"
  },
  bottomButton: {
    width: Dimensions.get("window").width,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffb643",
    borderRightWidth: 0.5,
    borderRightColor: "#e5a43d",
    borderLeftWidth: 0.5,
    borderLeftColor: "#e5a43d"
  },
  bottomText: {
    fontSize: 12,
    color: "white"
  }
});

const mapStateToProps = ({ currentOrder }) => ({ currentOrder });

export default connect(mapStateToProps)(SparepartListDetail);
