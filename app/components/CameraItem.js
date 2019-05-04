import React from "react";
import PropTypes from "prop-types";
import { TouchableNativeFeedback, View, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";

const CameraItem = ({
  onPress,
  iconSize,
  iconColor,
  containerSize,
  containerColor,
  image,
  isReadOnly
}) => {
  let propStyles = {
    ...containerSize,
    backgroundColor: containerColor
  };

  return (
    <TouchableNativeFeedback
      onPress={() => {
        if (!isReadOnly) onPress();
      }}
    >
      <View style={[styles.container, propStyles]}>
        {image ? (
          <Image
            style={containerSize}
            source={{ uri: image }}
            resizeMode="cover"
          />
        ) : (
          <Icon
            name="camera"
            type="font-awesome"
            color={iconColor}
            size={iconSize}
          />
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

CameraItem.propTypes = {
  image: PropTypes.string,
  isReadOnly: PropTypes.bool,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  containerSize: PropTypes.object,
  containerColor: PropTypes.string,
  onPress: PropTypes.func
};

CameraItem.defaultProps = {
  isReadOnly: false,
  iconSize: 32,
  iconColor: "white",
  containerSize: { width: 96, height: 96 },
  containerColor: "#555"
};

export default CameraItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});
