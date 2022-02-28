import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import { useAppStore } from '../stores/app';
import shallow from 'zustand/shallow';
import images from './../utils/images';
import getImageSize from './../utils/getImageSize';

const PageTemplate = ({ isRandomImage, image, children }) => {
  const imageRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });
  const { isLoading } = useAppStore(
    (state) => ({ isLoading: state.isLoading }),
    shallow
  );

  useEffect(() => {
    imageRef.current = image;

    if (isRandomImage) {
      const imagesArr = Object.keys(images.isometric).map(
        (key) => images.isometric[key]
      );
      const randomIndex = Math.floor(Math.random() * imagesArr.length);
      imageRef.current = imagesArr[randomIndex];
    }
  }, []);

  const calculateNextSize = (actualWiewHeight, width, height) => {
    const aspectRatio = width / height;
    const nextHeight = Math.floor(actualWiewHeight);
    const nextWidth = Math.floor(actualWiewHeight * aspectRatio);
    setImgSize({ width: nextWidth, height: nextHeight });
  };

  useEffect(() => {
    if (!imageRef.current) return;
    const actualWiewHeight = viewSize.height - 40;

    getImageSize(imageRef.current).then(({ width, height }) => {
      calculateNextSize(actualWiewHeight, width, height);
    });
  }, [viewSize, imageRef.current]);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} onLayout={onLayout}>
        <Image
          source={imageRef.current}
          style={{
            flex: 1,
            width: imgSize.width,
            height: imgSize.height,
          }}
        />
      </View>
      <ScrollView
        // style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    flex: 1,
  },
  content: {
    // flex: 3,
  },
  contentContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { PageTemplate };
