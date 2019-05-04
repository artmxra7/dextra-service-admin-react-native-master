import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Spinner, Thumbnail, Fab, Icon } from "native-base";
import Axios from "axios";
import moment from "moment";

import { styles } from "../../assets/styles/Style";
import ModalAttendance from "../../components/ModalAttendance";
import { config } from "../../config/Config";
import Data from "../../config/Data";
import Modal from "react-native-modal";

const data = new Data();
export default class JobDayDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        job: {
          job_category: {},
          user_member: {
            company: {}
          }
        },
        user_mechanic: {},
        status: "waiting"
      },
      dataCamera: null,
      currentLocationName: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
      },
      user: {},
      timeStartWorking: moment().format("H:mm:ss"),
      isModalAttendanceOpen: false,
      isCameraOpen: false,
      isFinishProgress: false,
      activityPhotos: [],
      jobDayPhotos: [],
      notes: "",
      recommendations: ""
    };

    this.setModalOpen = this.setModalOpen.bind(this);
    this.initTimer = this.initTimer.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    const { data } = this.state;
    const { status } = data;

    if (status === "wip") {
      clearInterval(this.timer);
    }
  }

  initTimer() {
    const {
      date,
      start_working,
      finish_working,
      working_hours
    } = this.state.data;

    const startTime = moment(start_working, "H:mm:ss");

    this.timer = setInterval(() => {
      const currentTime = moment(new Date(), "H:mm:ss");
      const diff = moment.duration(currentTime.diff(startTime));
      const hours = diff.hours() < 10 ? `0${diff.hours()}` : diff.hours();
      const minutes =
        diff.minutes() < 10 ? `0${diff.minutes()}` : diff.minutes();
      const seconds =
        diff.seconds() < 10 ? `0${diff.seconds()}` : diff.seconds();
      const workHours = `${hours}:${minutes}:${seconds}`;

      this.setState({
        data: {
          ...this.state.data,
          finish_working: currentTime.format("H:mm:ss"),
          working_hours: workHours
        }
      });
    }, 1000);
  }

  async getData() {
    const { navigation } = this.props;
    const { params } = navigation.state;

    const user = await data.select("user");
    const { jobDayID } = params;
    const attendanceURL = `${config.base_url}attachments/attendances/`;

    try {
      const response = await Axios.get(`${config.url}jobs/days/${jobDayID}`);
      const data = response.data.data;
      const { photos } = data;
      const maxPhotos = 6;
      let jobDayPhotos = [...Array(maxPhotos)].fill(null);
      let activityPhotos = [...Array(maxPhotos)].fill(null);

      const getPhotoPath = (item, index) => {
        const currentPhoto = photos[index];
        return currentPhoto ? `${attendanceURL}${currentPhoto.photo}` : null;
      };

      const getItem = (item, index) => photos[index] || null;

      jobDayPhotos = jobDayPhotos.map(getItem);
      activityPhotos = activityPhotos.map(getPhotoPath);

      this.setState(
        prevState => ({
          data,
          dataCamera: attendanceURL + data.photo_attendance,
          currentLocationName: data.location_name,
          region: {
            ...prevState.region,
            latitude: data.latitude,
            longitude: data.longitude
          },
          user,
          timeStartWorking: data.start_working,
          activityPhotos,
          jobDayPhotos,
          notes: data.notes,
          recommendations: data.recommendation
        }),
        () => data.status === "wip" && this.initTimer()
      );
    } catch (error) {
      console.error(error);
    }
  }

  setModalOpen(isOpen) {
    this.setState({ isModalAttendanceOpen: isOpen });
  }

  render() {
    let {
      data,
      user,
      dataCamera,
      currentLocationName,
      isModalAttendanceOpen,
      isFinishProgress,
      activityPhotos,
      notes,
      recommendations
    } = this.state;

    return (
      <View style={styles.container}>
        <Fab
          direction="up"
          containerStyle={{ zIndex: 4 }}
          style={{ backgroundColor: "#868686" }}
          position="bottomRight"
          onPress={() => this.setModalOpen(true)}
        >
          <Icon name="list-box" />
        </Fab>
        <ScrollView
          style={[styles.content, { padding: 28, backgroundColor: "#eee" }]}
        >
          <View style={{ marginBottom: 30 }}>
            {dataCamera && (
              <View
                style={{
                  alignSelf: "center",
                  marginBottom: 10,
                  alignItems: "center"
                }}
              >
                <Thumbnail
                  square
                  style={{ width: 150, height: 150 }}
                  source={{ uri: dataCamera }}
                />
                <Text style={{ fontSize: 18, marginBottom: 32 }}>
                  {data.user_mechanic.name}
                </Text>
              </View>
            )}

            <View style={{ marginBottom: 32 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "black" }}
              >
                Day {data.days}
              </Text>
              <Text style={{ fontSize: 16 }}>{data.date}</Text>
            </View>
            <View style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.5 }}>
                  <Text style={[styles.content_body_font, localStyles.label]}>
                    Start Time
                  </Text>
                  <Text style={[styles.content_body_font, localStyles.value]}>
                    {data.start_working}
                  </Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={[styles.content_body_font, localStyles.label]}>
                    Finish Time
                  </Text>
                  <Text style={[styles.content_body_font, localStyles.value]}>
                    {data.finish_working}
                  </Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={[styles.content_body_font, localStyles.label]}>
                    Total Time
                  </Text>
                  <Text style={[styles.content_body_font, localStyles.value]}>
                    {data.working_hours}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 48 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.5 }}>
                  <Text style={[styles.content_body_font, localStyles.label]}>
                    Job Category
                  </Text>
                  <Text style={[styles.content_body_font, localStyles.value]}>
                    {data.job.job_category.name}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.content_body_font, localStyles.label]}>
                    Job Description
                  </Text>
                  <Text style={[styles.content_body_font, localStyles.value]}>
                    {data.job.description}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <Text
                style={[
                  styles.font_list,
                  { fontSize: 18, textAlign: "center", marginBottom: 12 }
                ]}
              >
                GPS Attendance Location
              </Text>
            </View>
            <View
              style={{
                padding: 20,
                borderRadius: 6,
                backgroundColor: "#fff",
                marginBottom: 32
              }}
            >
              <Text style={{ color: "#e53935" }}>
                {currentLocationName
                  ? currentLocationName
                  : "GPS Auto dectection location when taking picture of attendance"}
              </Text>
            </View>
          </View>
        </ScrollView>
        <ModalAttendance
          isOpen={isModalAttendanceOpen}
          onPressClose={() => this.setModalOpen(false)}
          images={activityPhotos}
          form={{ notes, recommendations }}
          isReadOnly
        />
        <Modal style={{ height: 40 }} isVisible={isFinishProgress}>
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
  label: {
    fontSize: 14,
    fontWeight: "bold"
  },
  value: {
    fontSize: 14,
    color: "#555"
  }
});
