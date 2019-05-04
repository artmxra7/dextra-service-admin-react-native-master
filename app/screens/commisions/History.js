import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl
} from "react-native";
import { Spinner } from "native-base";
import Axios from "axios";
import CommisionItem from "../../components/CommisionItem";
import { styles } from "../../assets/styles/Style";
import { config } from "../../config/Config";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      withdraws: [],
      isProgress: false
    };

    this.detail = this.detail.bind(this);
    this.getWithdraws = this.getWithdraws.bind(this);
  }

  componentDidMount() {
    this.getWithdraws();
  }

  async getWithdraws() {
    this.setState({ isProgress: true });

    try {
      let response = await Axios.get(config.url + "withdraws/status/completed");
      let withdraws = response.data.data;

      this.setState({ withdraws, isProgress: false });
    } catch (error) {
      this.setState({ isProgress: false });
      console.error(error);
    }
  }

  detail(withdrawID) {
    this.props.navigation.navigate("CommisionDetail", { withdrawID });
  }

  render() {
    let { withdraws, isProgress } = this.state;

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[
            styles.content,
            { padding: 0, paddingTop: 2, backgroundColor: "#eee" }
          ]}
          refreshControl={
            <RefreshControl
              refreshing={isProgress}
              onRefresh={this.getWithdraws}
            />
          }
        >
          {isProgress && (
            <View style={{ alignItems: "center" }}>
              <Spinner color="#333" />
            </View>
          )}
          {!isProgress &&
            withdraws.map(withdraw => (
              <CommisionItem
                key={withdraw.id}
                customer_name={withdraw.user.name}
                date={withdraw.date}
                amount={withdraw.amount}
                onPress={() => this.detail(withdraw.id)}
              />
            ))}
          {withdraws.length == 0 && (
            <Text style={localStyles.empty}>No withdraws were found !</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  empty: {
    textAlign: "center",
    marginTop: 48
  }
});
