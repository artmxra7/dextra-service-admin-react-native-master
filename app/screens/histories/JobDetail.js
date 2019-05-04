import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TextInput,
  DatePickerAndroid
} from "react-native";
import { Thumbnail, Spinner } from "native-base";
import { connect } from "react-redux";

import { Icon } from "react-native-elements";
import _ from "lodash";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import moment from "moment";
import Axios from "axios";

import { styles } from "../../assets/styles/Style";
import Link from "../../components/Link";
import List from "../../components/List";
import Button from "../../components/Button";
import JobDayItem from "../../components/JobDayItem";
import Input from "../../components/Input";
import MechanicApprovalItem from "../../components/MechanicApprovalItem";
import MechanicSelectItem from "../../components/MechanicSelectItem";
import { config } from "../../config/Config";
import Data from "../../config/Data";

const data = new Data();

class JobDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        location_lat: -7.449452,
        location_long: 112.697036,
        user_member: {
          company: {}
        },
        job_category: {},
        quotation: {},
        status: ""
      },
      schedules: [],
      mechanics: [],
      remarks: "",
      isProgress: false,
      isModalProgress: false,
      isModalMechanicOpen: false,
      isModalScheduleOpen: false,
      isModalAddMechanicOpen: false,
      mechanicList: [],
      keyword_mechanic: "",
      scheduleDate: "",
      scheduleFromDate: "",
      scheduleUntilDate: "",
      selectedMechanicID: "",
      dayIndex: null,
      scheduleID: null
    };

    // Mechanics Database should not filtered
    this.mechanicListDB = [];

    this.changeStatus = this.changeStatus.bind(this);
    this.toUploadOffer = this.toUploadOffer.bind(this);
    this.toViewOffer = this.toViewOffer.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
    this.createSchedule = this.createSchedule.bind(this);
    this.createMassSchedule = this.createMassSchedule.bind(this);
    this.editSchedule = this.editSchedule.bind(this);
    this.apply = this.apply.bind(this);
    this.finish = this.finish.bind(this);
    this.getMechanicList = this.getMechanicList.bind(this);
    this.openModalAddMechanic = this.openModalAddMechanic.bind(this);
    this.searchMechanicList = this.searchMechanicList.bind(this);
    this.resetMechanicList = this.resetMechanicList.bind(this);
    this.selectMechanicList = this.selectMechanicList.bind(this);
    this.openJobDay = this.openJobDay.bind(this);
    this.editJobDay = this.editJobDay.bind(this);
    this.deleteJobDay = this.deleteJobDay.bind(this);
  }

  componentDidMount() {
    this.getMechanicList();
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps);
  }

  getData(nextProps) {
    const { data, isProgress } = nextProps;
    const { job_mechanics: mechanics, job_days: schedules, ...rest } = data;

    this.setState({
      isProgress,
      data: rest,
      mechanics,
      schedules
    });
  }

  async changeStatus(mechanicID, status) {
    try {
      let response = await Axios.put(
        config.url + "job_mechanics/" + mechanicID,
        { status }
      );

      this.setState(prevState => {
        let mechanics = prevState.mechanics.map(mechanic => {
          if (mechanicID == mechanic.id) {
            return { ...mechanic, status };
          }

          return mechanic;
        });

        return { mechanics };
      });
    } catch (error) {
      console.error(error.response);
    }
  }

  toUploadOffer() {
    let { data } = this.state;
    const { navigate } = this.props.navigation;
    const historyID = data.id;

    navigate("UploadOffer", { historyID, type: "job" });
  }

  toViewOffer() {
    let { data } = this.state;
    let { navigation } = this.props;

    navigation.navigate("OfferViewer", { downloadable: data.quotation });
  }

  async apply() {
    let { data, schedules } = this.state;

    if (schedules.length == 0) {
      alert("You should create schedules !");
      return;
    }

    try {
      await Axios.put(config.url + "jobs/" + data.id, {
        status: "wip",
        fcm_type: "job_wip"
      });

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          status: "wip"
        }
      }));
    } catch (error) {
      console.error(error.response);
    }
  }

  renderBottomButton() {
    let { data } = this.state;

    switch (data.status) {
      case "waiting":
      case "quotation_rejected":
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableNativeFeedback
              onPress={() => this.setState({ isModalMechanicOpen: true })}
            >
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>Assign Mechanics</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={this.toUploadOffer}>
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>Upload Offer</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        );

      case "quotation":
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableNativeFeedback
              onPress={() => this.setState({ isModalMechanicOpen: true })}
            >
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>Assign Mechanics</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={this.toViewOffer}>
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>View Offer</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        );

      case "quotation_agreed":
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableNativeFeedback onPress={this.apply}>
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>Apply</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() =>
                this.setState({ isModalMassScheduleOpen: true, dayIndex: null })
              }
            >
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>Mass Schedule</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() =>
                this.setState({ isModalScheduleOpen: true, dayIndex: null })
              }
            >
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>Create Schedule</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        );

      case "wip":
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableNativeFeedback onPress={this.finish}>
              <View style={localStyles.bottomButton}>
                <Text style={localStyles.bottomText}>Finish</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        );

      default:
        return null;
    }
  }

  async openDatePicker(dateSelected, typeDate) {
    let now = new Date();
    if (dateSelected || dateSelected != "") {
      dateSelected = new Date(dateSelected);
    } else {
      dateSelected = now;
    }

    try {
      let { action, year, month, day } = await DatePickerAndroid.open({
        date: dateSelected
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        month += 1;
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;

        const scheduleDate = `${year}-${month}-${day}`;
        const selected = new Date(scheduleDate);
        if (now.setHours(0, 0, 0, 0) <= selected.setHours(0, 0, 0, 0)) {
          if (typeDate == "date") {
            this.setState({ scheduleDate });
          } else if (typeDate == "from") {
            this.setState({ scheduleFromDate: scheduleDate });
          } else if (typeDate == "until") {
            this.setState({ scheduleUntilDate: scheduleDate });
          }
        } else {
          alert("You can't select yesterday !");
        }
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }

  async createSchedule() {
    let { schedules, scheduleDate, selectedMechanicID } = this.state;

    if (!scheduleDate || !selectedMechanicID) return;

    let { state } = this.props.navigation;

    try {
      let response = await Axios.post(config.url + "jobs/days", {
        date: scheduleDate,
        job_id: state.params.jobID,
        user_mechanic_id: selectedMechanicID,
        days: schedules.length + 1
      });

      this.setState(prevState => {
        let schedules = [...prevState.schedules, response.data.data];

        return {
          schedules,
          scheduleDate: "",
          selectedMechanicID: "",
          dayIndex: null,
          scheduleID: null,
          isModalScheduleOpen: false
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createMassSchedule() {
    let {
      schedules,
      scheduleFromDate,
      scheduleUntilDate,
      selectedMechanicID
    } = this.state;

    if (!scheduleFromDate || !scheduleUntilDate || !selectedMechanicID) return;

    let { state } = this.props.navigation;

    try {
      let response = await Axios.post(config.url + "jobs/days/mass", {
        date_from: scheduleFromDate,
        date_until: scheduleUntilDate,
        job_id: state.params.jobID,
        user_mechanic_id: selectedMechanicID
      });
      let data = response.data.data;

      let mechanics = [...data.job_mechanics];
      let schedules = [...data.job_days];

      delete data.job_mechanics;
      delete data.job_days;

      this.setState({
        data,
        mechanics,
        schedules,
        scheduleFromDate: "",
        scheduleUntilDate: "",
        selectedMechanicID: "",
        dayIndex: null,
        scheduleID: null,
        isModalMassScheduleOpen: false
      });
    } catch (error) {
      console.error(error.response);
    }
  }

  async editSchedule() {
    let {
      schedules,
      scheduleDate,
      selectedMechanicID,
      dayIndex,
      scheduleID
    } = this.state;

    if (!scheduleDate || !selectedMechanicID) return;

    let { state } = this.props.navigation;

    try {
      let response = await Axios.post(config.url + "jobs/days/" + scheduleID, {
        _method: "PATCH",
        date: scheduleDate,
        job_id: state.params.jobID,
        user_mechanic_id: selectedMechanicID,
        days: dayIndex
      });
      let data = response.data.data;

      let mechanics = [...data.job_mechanics];
      let schedules = [...data.job_days];

      delete data.job_mechanics;
      delete data.job_days;

      this.setState({
        data,
        mechanics,
        schedules,
        scheduleDate: "",
        selectedMechanicID: "",
        dayIndex: null,
        scheduleID: null,
        isModalScheduleOpen: false
      });
    } catch (error) {
      console.error(error.response);
    }
  }

  async finish() {
    let { schedules } = this.state;

    const isWorkDone = _.some(schedules, { status: "done" });

    if (!isWorkDone) {
      alert("Works aren't done yet !");
      return;
    }

    const { state } = this.props.navigation;
    const jobID = state.params.jobID;

    try {
      await Axios.post(config.url + "jobs/" + jobID, {
        _method: "PATCH",
        status: "close",
        fcm_type: "job_close"
      });

      await Axios.post(config.url + "commissions", {
        id: jobID,
        type: "job"
      });

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          status: "close"
        }
      }));
    } catch (error) {
      this.setState({ isProgress: false });
      console.error(error);
    }
  }

  async getMechanicList() {
    try {
      let response = await Axios.post(config.url + "mechanics/all");
      let mechanicList = response.data.data;

      this.mechanicListDB = mechanicList;
      this.setState({ mechanicList });
    } catch (error) {
      console.error(error);
    }
  }

  openModalAddMechanic() {
    this.setState({ isModalAddMechanicOpen: true });
    this.resetMechanicList();
  }

  searchMechanicList(keyword) {
    let mechanicList = [...this.mechanicListDB];
    mechanicList = mechanicList.filter(function(mechanic) {
      if (mechanic.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
        return mechanic;
      }
    });

    this.setState({ mechanicList });
  }

  resetMechanicList() {
    this.setState({
      mechanicList: this.mechanicListDB
    });
  }

  async selectMechanicList(mechanic) {
    this.setState({ isModalProgress: true });

    try {
      let response = await Axios.post(config.url + "job_mechanics", {
        job_id: this.state.data.id,
        user_mechanic_id: mechanic.id,
        status: "waiting"
      });

      if (response.data.success) {
        let data = response.data.data;
        let mechanics = [...data.job_mechanics];

        delete data.job_mechanics;

        this.setState({
          isModalAddMechanicOpen: false,
          isModalProgress: false,
          data,
          mechanics
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      this.setState({ isModalProgress: false });
      alert(error.response.data.message);
    }
  }

  async openJobDay(id) {
    const { navigation } = this.props;

    navigation.navigate("JobDayDetail", { jobDayID: id });
  }

  async editJobDay(scheduleID) {
    this.setState({ isModalProgress: true });
    try {
      let response = await Axios.get(
        config.url + "jobs/days/get/" + scheduleID
      );
      let data = response.data.data;

      this.setState({
        scheduleDate: moment(data.date).format("YYYY-MM-DD"),
        selectedMechanicID: data.user_mechanic_id,
        dayIndex: data.days,
        scheduleID,
        isModalScheduleOpen: true,
        isModalProgress: false
      });
    } catch (error) {
      this.setState({ isModalProgress: false });
      console.error(error);
    }
  }

  async deleteJobDay(scheduleID) {
    try {
      let response = await Axios.post(config.url + "jobs/days/" + scheduleID, {
        _method: "DELETE"
      });
      let data = response.data.data;

      let mechanics = [...data.job_mechanics];
      let schedules = [...data.job_days];

      delete data.job_mechanics;
      delete data.job_days;

      this.setState({
        data,
        mechanics,
        schedules
      });

      alert("Success remove job schedule");
    } catch (error) {
      console.error(error.response);
    }
  }

  render() {
    let {
      data,
      isProgress,
      isModalProgress,
      isModalMechanicOpen,
      isModalScheduleOpen,
      isModalMassScheduleOpen,
      isModalAddMechanicOpen,
      keyword_mechanic,
      mechanicList,
      remarks,
      mechanics,
      schedules,
      scheduleDate,
      scheduleFromDate,
      scheduleUntilDate,
      selectedMechanicID,
      dayIndex
    } = this.state;

    let approved = mechanics.filter(mechanic => mechanic.status == "approved");
    let date = moment(data.created_at).format("dddd, Do MMM YYYY | h:mm:ss");
    let status = data.status.replace("_", " ");
    status = status.replace(/\b\w/g, char => char.toUpperCase());

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[styles.content, { padding: 2, backgroundColor: "#eee" }]}
        >
          {isProgress && (
            <View style={{ alignItems: "center" }}>
              <Spinner color="#333" />
            </View>
          )}
          {!isProgress && (
            <View style={{ padding: 18 }}>
              <View style={{ marginBottom: 24 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Customer Name
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.user_member.name}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Customer Company
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.user_member.company.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 24 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Job Category
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.job_category.name}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Job Description
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.description}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 24 }}>
                <View>
                  <Text style={[styles.content_body_font, localStyles.label]}>
                    Location Name
                  </Text>
                  <Text style={[styles.content_body_font, localStyles.value]}>
                    {data.location_name}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 8 }}>
                <View>
                  <MapView
                    style={localStyles.map}
                    initialRegion={{
                      latitude: parseFloat(data.location_lat),
                      longitude: parseFloat(data.location_long),
                      latitudeDelta: 0,
                      longitudeDelta: 0
                    }}
                    loadingEnabled={true}
                  >
                    <MapView.Marker
                      title="Job Location"
                      key={1}
                      coordinate={{
                        longitude: parseFloat(data.location_long),
                        latitude: parseFloat(data.location_lat)
                      }}
                    />
                  </MapView>
                </View>
              </View>
              <View style={{ marginBottom: 24 }}>
                <View>
                  <Text style={[styles.content_body_font, localStyles.label]}>
                    Location Description
                  </Text>
                  <Text style={[styles.content_body_font, localStyles.value]}>
                    {data.location_description}
                  </Text>
                </View>
              </View>
              {(data.status == "quotation_agreed" ||
                data.status == "quotation_rejected" ||
                data.status == "wip" ||
                data.status == "close") && (
                <View style={{ marginBottom: 24 }}>
                  <View>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Remarks
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.quotation.remarks}
                    </Text>
                  </View>
                </View>
              )}
              <View style={{ marginBottom: 24 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Order Date
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {date}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Status Order
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {status}
                    </Text>
                  </View>
                </View>
              </View>
              {(data.status == "quotation_agreed" ||
                data.status == "wip" ||
                data.status == "close") && (
                <View style={{ marginTop: 12, marginBottom: 12 }}>
                  <Text
                    style={[
                      styles.content_body_font,
                      {
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "bold",
                        marginBottom: 16
                      }
                    ]}
                  >
                    Job Schedule
                  </Text>

                  {schedules.map((schedule, index) => {
                    return (
                      <JobDayItem
                        key={index}
                        date={schedule.date}
                        days={schedule.days}
                        working_hours={schedule.working_hours}
                        notes={schedule.notes}
                        recommendation={schedule.recommendation}
                        status={schedule.status}
                        editable
                        onPress={() =>
                          schedule.status !== "waiting" &&
                          this.openJobDay(schedule.id)
                        }
                        onPressEdit={() => this.editJobDay(schedule.id)}
                        onPressDelete={() => this.deleteJobDay(schedule.id)}
                      />
                    );
                  })}

                  {schedules.length == 0 && (
                    <Text style={{ textAlign: "center" }}>
                      No schedules created !
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {this.renderBottomButton()}

        <Modal isVisible={isModalMechanicOpen}>
          <View style={localStyles.modal}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ isModalMechanicOpen: false })}
            >
              <View style={localStyles.close}>
                <Icon name="close" type="font-awesome" color="#ddd" size={16} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.openModalAddMechanic()}
            >
              <View style={localStyles.add_new}>
                <Text style={localStyles.add_new_text}>Add Mechanic</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={localStyles.modalTitle}>Mechanics</Text>
            <ScrollView style={{ flex: 1 }}>
              {mechanics.map(mechanic => {
                return (
                  <MechanicApprovalItem
                    key={mechanic.id}
                    name={mechanic.user.name}
                    phone={mechanic.user.phone}
                    status={mechanic.status}
                    onPress={status => this.changeStatus(mechanic.id, status)}
                  />
                );
              })}
              {mechanics.length == 0 && (
                <Text style={localStyles.empty}>No mechanics was joined !</Text>
              )}
            </ScrollView>
          </View>
        </Modal>

        <Modal isVisible={isModalAddMechanicOpen}>
          <View style={localStyles.modal}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ isModalAddMechanicOpen: false })}
            >
              <View style={localStyles.close}>
                <Icon name="close" type="font-awesome" color="#ddd" size={16} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={localStyles.modalTitle}>Mechanics</Text>
            <View
              style={{ flexDirection: "row", marginTop: 4, marginBottom: 8 }}
            >
              <Input
                placeholder="Search your mechanic"
                style={localStyles.searchbox}
                onChangeText={keyword_mechanic =>
                  this.setState({ keyword_mechanic })
                }
                onSubmitEditing={() =>
                  this.searchMechanicList(keyword_mechanic)
                }
              />
              <TouchableNativeFeedback
                onPress={() => this.searchMechanicList(keyword_mechanic)}
              >
                <View style={localStyles.searchButton}>
                  <Icon
                    name="search"
                    type="font-awesome"
                    color="white"
                    size={16}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
            {mechanicList.length > 0 && (
              <ScrollView style={{ flex: 1 }}>
                {mechanicList.map((mechanic, index) => {
                  return (
                    <MechanicSelectItem
                      key={mechanic.id}
                      name={mechanic.name}
                      phone={mechanic.phone}
                      isSelected={false}
                      onPress={() => this.selectMechanicList(mechanic)}
                    />
                  );
                })}
              </ScrollView>
            )}
            {mechanicList.length == 0 && (
              <Text style={localStyles.empty}>
                Your mechanic was not found T_T
              </Text>
            )}
          </View>
        </Modal>

        <Modal isVisible={isModalScheduleOpen}>
          <View style={localStyles.modal}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ isModalScheduleOpen: false })}
            >
              <View style={localStyles.close}>
                <Icon name="close" type="font-awesome" color="#ddd" size={16} />
              </View>
            </TouchableWithoutFeedback>
            {dayIndex && (
              <Text style={localStyles.modalTitle}>Edit Schedule</Text>
            )}
            {!dayIndex && (
              <Text style={localStyles.modalTitle}>Create Schedule</Text>
            )}
            {dayIndex && (
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginVertical: 18
                }}
              >
                Day {dayIndex}
              </Text>
            )}
            {!dayIndex && (
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginVertical: 18
                }}
              >
                Day {schedules.length + 1}
              </Text>
            )}
            <TouchableWithoutFeedback
              onPress={() => this.openDatePicker(scheduleDate, "date")}
            >
              <View style={localStyles.datepicker}>
                <Text>{scheduleDate || "Select Date"}</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                marginBottom: 24,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              Select a Mechanic
            </Text>
            <ScrollView style={{ height: 240, marginBottom: 24 }}>
              {approved.map(mechanic => {
                return (
                  <MechanicSelectItem
                    key={mechanic.id}
                    name={mechanic.user.name}
                    phone={mechanic.user.phone}
                    isSelected={selectedMechanicID == mechanic.user.id}
                    onPress={() =>
                      this.setState({ selectedMechanicID: mechanic.user.id })
                    }
                  />
                );
              })}
            </ScrollView>
            {dayIndex && <Button text="Submit" onPress={this.editSchedule} />}
            {!dayIndex && (
              <Button text="Submit" onPress={this.createSchedule} />
            )}
          </View>
        </Modal>

        <Modal isVisible={isModalMassScheduleOpen}>
          <View style={localStyles.modal}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ isModalMassScheduleOpen: false })}
            >
              <View style={localStyles.close}>
                <Icon name="close" type="font-awesome" color="#ddd" size={16} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={localStyles.modalTitle}>Create Mass Schedule</Text>
            <TouchableWithoutFeedback
              onPress={() => this.openDatePicker(scheduleFromDate, "from")}
            >
              <View style={localStyles.datepicker}>
                <Text>{scheduleFromDate || "Select From Date"}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.openDatePicker(scheduleUntilDate, "until")}
            >
              <View style={localStyles.datepicker}>
                <Text>{scheduleUntilDate || "Select Until Date"}</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                marginBottom: 24,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              Select a Mechanic
            </Text>
            <ScrollView style={{ height: 240, marginBottom: 24 }}>
              {approved.map(mechanic => {
                return (
                  <MechanicSelectItem
                    key={mechanic.id}
                    name={mechanic.user.name}
                    phone={mechanic.user.phone}
                    isSelected={selectedMechanicID == mechanic.user.id}
                    onPress={() =>
                      this.setState({ selectedMechanicID: mechanic.user.id })
                    }
                  />
                );
              })}
            </ScrollView>
            <Button text="Submit" onPress={this.createMassSchedule} />
          </View>
        </Modal>

        <Modal style={{ height: 40 }} isVisible={isModalProgress}>
          <View
            style={{
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20
            }}
          >
            <Spinner color="#333" />
          </View>
        </Modal>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  map: {
    height: 200
  },
  bottomMenu: {
    width: Dimensions.get("window").width,
    height: 48,
    flexDirection: "row"
  },
  bottomButton: {
    flex: 1,
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
  },
  label: {
    fontSize: 14,
    fontWeight: "bold"
  },
  value: {
    fontSize: 16,
    color: "#555"
  },
  remarks: {
    marginTop: 8,
    padding: 16,
    textAlignVertical: "top",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#bbb",
    borderRadius: 5
  },
  largeButton: {
    width: "100%",
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363636",
    marginTop: 12,
    borderRadius: 4
  },
  largeButtonText: {
    fontSize: 14,
    color: "white"
  },
  close: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  add_new: {
    position: "absolute",
    top: 8,
    left: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  add_new_text: {
    fontSize: 12,
    backgroundColor: "#666",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 24,
    paddingBottom: 32,
    maxHeight: 480,
    minHeight: 240
  },
  modalTitle: {
    fontWeight: "bold",
    color: "#363636",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 16
  },
  name: {
    fontWeight: "bold",
    color: "black"
  },
  empty: {
    textAlign: "center",
    marginTop: 48
  },
  datepicker: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed",
    marginBottom: 16
  },
  mechanic: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingVertical: 8
  },
  mechanicName: {
    fontWeight: "bold",
    color: "#363636"
  },
  searchbox: {
    flex: 0.75,
    borderWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  searchButton: {
    flex: 0.25,
    backgroundColor: "#ffb643",
    marginLeft: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = ({ currentJob }) => ({
  data: currentJob.data,
  isProgress: currentJob.isLoading
});

export default connect(mapStateToProps)(JobDetail);
