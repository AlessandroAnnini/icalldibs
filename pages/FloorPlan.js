import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import images from './../utils/images';
import getImageSize from './../utils/getImageSize';

const FloorPlan = ({ route, navigation }) => {
  const { name } = route.params;
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width: viewWidth } = event.nativeEvent.layout;
    getImageSize(images.floorPlan[name]).then(({ width, height }) => {
      const aspectRatio = width / height;
      const newWidth = viewWidth;
      const newHeight = newWidth / aspectRatio;
      setImgSize({ width: newWidth, height: newHeight });
    });
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={imgSize.width}
        imageHeight={imgSize.height}>
        <Image
          style={{
            flex: 1,
            width: imgSize.width,
            height: imgSize.height,
          }}
          source={images.floorPlan[name]}
        />
      </ImageZoom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height - 20,
  },
});

export default FloorPlan;
