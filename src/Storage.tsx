import { useEffect, useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { Image } from 'expo-image';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const [displayDownloadedImage, setDisplayDownloadedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
        const url = await getUrl({
            path: 'profile-pictures/c96bf6e4-189c-4554-8602-bfcdf05e38e6.jpeg',
        });
        setDisplayDownloadedImage(url.url.toString());
    }
    fetchImage();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
        return;
    }
    await fetchImageFromUri(image).then((blob) => {
        uploadData({
            path: 'profile-pictures/' + image.split('/').pop(),
            data: blob,
            options: {
                contentType: 'image/jpeg',
            }
        })
        console.log('Image uploaded');
    });
  }

  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Clear Image" onPress={() => {setImage(null)}} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Button title="Upload" onPress={uploadImage} />}
      {displayDownloadedImage && <Image source={displayDownloadedImage} style={styles.image} placeholder={'test'} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
