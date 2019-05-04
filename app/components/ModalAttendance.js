import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal
} from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";

import CameraItem from "./CameraItem";
import Input from "./Input";

const ModalAttendance = ({
  isOpen,
  isReadOnly,
  onPressCamera,
  onPressClose,
  onInsert,
  images,
  form
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      onRequestClose={() => {}}
    >
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={onPressClose}>
          <View style={styles.close}>
            <Icon name="close" type="font-awesome" color="#bbb" size={16} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.label}>Activity Picture</Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16
            }}
          >
            {[0, 1, 2].map(number => (
              <CameraItem
                key={number}
                onPress={() => onPressCamera(number)}
                image={images[number]}
                isReadOnly={isReadOnly}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16
            }}
          >
            {[3, 4, 5].map(number => (
              <CameraItem
                key={number}
                onPress={() => onPressCamera(number)}
                image={images[number]}
                isReadOnly={isReadOnly}
              />
            ))}
          </View>
        </View>
        <Text style={styles.label}>Notes</Text>
        <Input
          style={{ backgroundColor: "#eee" }}
          value={form.notes}
          editable={!isReadOnly}
          onChangeText={text => onInsert("notes", text)}
        />
        <Text style={styles.label}>Recommendations</Text>
        <Input
          style={{ backgroundColor: "#eee" }}
          value={form.recommendations}
          editable={!isReadOnly}
          onChangeText={text => onInsert("recommendations", text)}
        />
      </ScrollView>
    </Modal>
  );
};

ModalAttendance.propTypes = {
  isOpen: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  onPressCamera: PropTypes.func,
  onPressClose: PropTypes.func,
  onInsert: PropTypes.func,
  images: PropTypes.array,
  form: PropTypes.object
};

ModalAttendance.defaultProps = {
  isOpen: false,
  isReadOnly: false,
  onPressCamera: () => {},
  onPressClose: () => {},
  onInsert: () => {}
};

export default ModalAttendance;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "white"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3
  }
});
