import { put, takeEvery, all, call, select } from "redux-saga/effects";
import axios from "axios";

import { config } from "../config/Config";
import { setOrders, setOrdersLoading } from "./orders/Actions";
import { setJobs, setJobsLoading } from "./jobs/Actions";
import { setCurrentOrder } from "./currentOrder/Actions";
import { setCurrentJob, setCurrentJobLoading } from "./currentJob/Actions";

function* fetchOrders() {
  yield takeEvery("FETCH_ORDERS", function*() {
    yield put(setOrdersLoading(true));

    try {
      const response = yield call(axios.get, `${config.url}orders`);
      const orders = response.data.data;

      yield put(setOrders(orders));
      yield put(setOrdersLoading(false));
    } catch (error) {
      console.error(error);
      yield put(setOrdersLoading(false));
    }
  });
}

function* fetchJobs() {
  yield takeEvery("FETCH_JOBS", function*() {
    yield put(setJobsLoading(true));

    try {
      const response = yield call(axios.get, `${config.url}jobs`);
      const jobs = response.data.data;

      yield put(setJobs(jobs));
      yield put(setJobsLoading(false));
    } catch (error) {
      console.error(error);
      yield put(setJobsLoading(false));
    }
  });
}

function* fetchCurrentOrder() {
  yield takeEvery("FETCH_CURRENT_ORDER", function*() {
    try {
      const getOrderID = state => state.currentOrderID;
      const orderID = yield select(getOrderID);
      const response = yield call(axios.get, `${config.url}orders/${orderID}`);
      const order = response.data.data;

      yield put(setCurrentOrder(order));
    } catch (error) {
      console.error(error);
    }
  });
}

function* fetchCurrentJob() {
  yield takeEvery("FETCH_CURRENT_JOB", function*() {
    yield put(setCurrentJobLoading(true));

    try {
      const getJobID = state => state.currentJobID;
      const jobID = yield select(getJobID);
      const response = yield call(axios.get, `${config.url}jobs/${jobID}`);
      const job = response.data.data;

      yield put(setCurrentJob(job));
      yield put(setCurrentJobLoading(false));
    } catch (error) {
      console.error(error);
      yield put(setCurrentJobLoading(false));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fetchOrders(),
    fetchJobs(),
    fetchCurrentOrder(),
    fetchCurrentJob()
  ]);
}
