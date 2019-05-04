import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl
} from "react-native";
import { Spinner } from "native-base";
import { connect } from "react-redux";

import JobItem from "../../components/JobItem";
import { styles } from "../../assets/styles/Style";
import { setCurrentJobID } from "../../store/currentJobID/Actions";
import { fetchCurrentJob } from "../../store/currentJob/Actions";
import { fetchJobs } from "../../store/jobs/Actions";

class JobList extends Component {
  constructor(props) {
    super(props);

    this.detail = this.detail.bind(this);
  }

  componentDidMount() {
    const { loadJobs } = this.props;

    loadJobs();
  }

  detail(jobID) {
    const { navigation, selectJob, loadJob } = this.props;

    selectJob(jobID);
    loadJob();
    navigation.navigate("JobDetail", { jobID });
  }

  render() {
    const { jobs, isProgress, loadJobs } = this.props;

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[styles.content, { padding: 2, backgroundColor: "#eee" }]}
          refreshControl={
            <RefreshControl refreshing={isProgress} onRefresh={loadJobs} />
          }
        >
          {isProgress && (
            <View style={{ alignItems: "center" }}>
              <Spinner color="#333" />
            </View>
          )}
          {!isProgress &&
            jobs.map(job => (
              <JobItem
                key={job.id}
                category={job.job_category.name}
                status={job.status}
                date={job.created_at}
                onPress={() => this.detail(job.id)}
              />
            ))}
          {jobs.length === 0 && (
            <Text style={localStyles.empty}>No jobs were found !</Text>
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

const mapStateToProps = ({ jobs }) => ({
  jobs: jobs.data,
  isProgress: jobs.isLoading
});

const mapDispatchToProps = dispatch => ({
  loadJobs: () => dispatch(fetchJobs()),
  selectJob: jobID => dispatch(setCurrentJobID(jobID)),
  loadJob: () => dispatch(fetchCurrentJob())
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
