import { Platform, Image } from 'react-native';

const isWeb = Platform.OS === 'web';

const getImageSize = (image) =>
  new Promise((resolve, reject) => {
    if (!image) reject(new Error('No image provided'));

    if (isWeb) {
      Image.getSize(
        image,
        (width, height) => resolve({ width, height }),
        reject
      );
    } else {
      const { width, height } = Image.resolveAssetSource(image);
      resolve({ width, height });
    }
  });

export default getImageSize;
