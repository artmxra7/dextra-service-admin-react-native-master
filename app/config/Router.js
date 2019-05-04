import React from "react";
import { AsyncStorage } from "react-native";
import { Icon } from "react-native-elements";
import { StackNavigator, TabNavigator } from "react-navigation";

import Intro from "../screens/auth/Intro";
import Login from "../screens/auth/Login";
import EmailSent from "../screens/auth/EmailSent";
import ResetPassword from "../screens/auth/ResetPassword";
import Timeline from "../screens/timelines/Timeline";
import TimelineDetail from "../screens/timelines/TimelineDetail";
import TabCommision from "../screens/commisions/Router";
import CommisionDetail from "../screens/commisions/CommisionDetail";
import CommisionWithdraw from "../screens/commisions/CommisionWithdraw";
import Router from "../screens/customers/Router";
import CustomerDetail from "../screens/customers/CustomerDetail";
import OrderSparepartList from "../screens/histories/OrderSparepartList";
import JobList from "../screens/histories/JobList";
import JobDetail from "../screens/histories/JobDetail";
import JobDayDetail from "../screens/histories/JobDayDetail";
import SparepartListDetail from "../screens/histories/SparepartListDetail";
import SparepartDetail from "../screens/histories/SparepartDetail";
import UploadOffer from "../screens/histories/UploadOffer";
import OfferViewer from "../screens/histories/OfferViewer";
import { styles } from "../assets/styles/Style";

import { Icon as Icons } from "native-base";

const logout = navigation => {
  AsyncStorage.clear();
  navigation.navigate("Intro");
};

export const CommisionIndex = StackNavigator({
  Commision: {
    screen: TabCommision,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Withdraw Approval"
    }
  },
  CommisionDetail: {
    screen: CommisionDetail,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Withdraw Detail"
    }
  },
  CommisionWithdraw: {
    screen: CommisionWithdraw,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Commision Withdraw"
    }
  }
});

export const CustomerIndex = StackNavigator(
  {
    Router: {
      screen: Router
    },
    CustomerDetail: {
      screen: CustomerDetail
    }
  },
  {
    navigationOptions: {
      header: false
    }
  }
);

// Timeline
export const TimelineIndex = StackNavigator({
  Timeline: {
    screen: Timeline,
    navigationOptions: ({ navigation }) => ({
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Home Timeline",
      headerRight: (
        <Icons
          name="md-exit"
          style={{ alignSelf: "center", color: "#fff", marginRight: 20 }}
          onPress={() => logout(navigation)}
        />
      )
    })
  }
});

export const OrderSparepartIndex = StackNavigator({
  OrderSparepartList: {
    screen: OrderSparepartList,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Products Order"
    }
  }
});

export const JobIndex = StackNavigator({
  JobList: {
    screen: JobList,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Job Order"
    }
  },
  JobDetail: {
    screen: JobDetail,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Job Detail"
    }
  },
  JobDayDetail: {
    screen: JobDayDetail,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Activity Detail"
    }
  }
});

// Main for Admin
export const FeedAdmin = TabNavigator(
  {
    TimelineIndex: {
      screen: TimelineIndex,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24} />
        )
      }
    },
    OrderSparepartIndex: {
      screen: OrderSparepartIndex,
      navigationOptions: {
        tabBarLabel: "Product",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="history"
            type="font-awesome"
            color={tintColor}
            size={24}
          />
        )
      }
    },
    JobIndex: {
      screen: JobIndex,
      navigationOptions: {
        tabBarLabel: "Job",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="history"
            type="font-awesome"
            color={tintColor}
            size={24}
          />
        )
      }
    },
    CommisionIndex: {
      screen: CommisionIndex,
      navigationOptions: {
        tabBarLabel: "Withdraw",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="money" type="font-awesome" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "#3E3C3C"
      },
      indicatorStyle: {
        backgroundColor: "#fff",
        height: 4,
        alignContent: "center"
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: "bold",
        padding: 0,
        margin: 0
      },
      iconStyle: {
        width: 24
      },
      activeTintColor: "#fff",
      scrollEnabled: false,
      showIcon: true,
      upperCaseLabel: false,
      pressColor: "transparent"
    },
    swipeEnabled: false,
    animationEnabled: false,
    navigationOptions: {
      tabBarVisible: true
    }
  }
);

export const Reset = StackNavigator({
  EmailSent: {
    screen: EmailSent,
    navigationOptions: {
      header: false
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: {
        visible: false
      }
    }
  }
});

// Main Router
export const Stack = StackNavigator({
  Intro: {
    screen: Intro,
    navigationOptions: {
      header: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: false
    }
  },
  Reset: {
    screen: Reset,
    navigationOptions: {
      header: false
    }
  },
  FeedAdmin: {
    screen: FeedAdmin,
    navigationOptions: {
      header: false
    }
  },
  TimelineDetail: {
    screen: TimelineDetail,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Home Timeline"
    }
  },
  SparepartListDetail: {
    screen: SparepartListDetail,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Order Product Detail"
    }
  },
  SparepartDetail: {
    screen: SparepartDetail,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Product Detail"
    }
  },
  UploadOffer: {
    screen: UploadOffer,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Upload Offer"
    }
  },
  OfferViewer: {
    screen: OfferViewer,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Offer Viewer"
    }
  },
  CommisionDetail: {
    screen: CommisionDetail,
    navigationOptions: {
      headerStyle: styles.header_menu,
      headerTitleStyle: styles.header_title,
      headerTintColor: "#fff",
      title: "Withdraw Detail"
    }
  }
});
