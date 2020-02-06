import React, { Component } from 'react';
import {
  StyleSheet,Text,View,TouchableOpacity,
  Image,FlatList,AsyncStorage,Dimensions,ScrollView} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
// import * as firebase from 'firebase';
import uuid from 'uuid/v4'; 

// var firebaseConfig = {
//   apiKey: "AIzaSyAQk0a1tg1D1_BUHikaepJGCtkYisjb4jo",
//   authDomain: "reactbuysell.firebaseapp.com",
//   databaseURL: "https://reactbuysell.firebaseio.com",
//   projectId: "reactbuysell",
//   storageBucket: "reactbuysell.appspot.com",
//   messagingSenderId: "597664386430",
//   appId: "1:597664386430:web:848f4ec10cd956f0f4372f"
// };
// // // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var { app } = firebase.storage();
// console.log(app.name);



const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const ImageRow = ({ image, windowWidth, popImage }) => (
  <View>
    <Image
      source={{ uri: image }}
      style={[styles.img, { width: windowWidth / 2 - 15 }]}
      onError={popImage}
    />
  </View>
);

export default class CameraApp extends Component {
  state = {
    imgSource: '',
    uploading: false,
    progress: 0,
    images: []
  };

  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('And error occured: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imgSource: source,
          imageUri: response.uri
        });
      }
    });
  };
  /**
   * Upload image method
   */
 
  uploadImage = ()=> {

    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({ uploading: true });

    // console.log("filenamefilenamefilenamefilename---->",filename, firebase.storage())
    // console.log("imageUri=====>", this.state.imageUri)
    
    firebase.storage().ref(`images/${filename}`).putFile(this.state.imageUri)
      .on( firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: allImages
            };
            AsyncStorage.setItem('images', JSON.stringify(allImages));
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );
  }

  render() {

    console.disableYellowBox =true
    // alert(JSON.stringify(app));
    const { uploading, imgSource, progress, images } = this.state;
    const windowWidth = Dimensions.get('window').width;
    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity
              style={actionBtnStyles}
              onPress={this.pickImage}
              disabled={uploading}
            >
              <View>
                <Text style={styles.btnTxt}>Pick image</Text>
              </View>
            </TouchableOpacity>
            {/** Display selected image */}
            {imgSource !== '' && (
              <View>
                <Image source={imgSource} style={styles.image} />
                {uploading && (
                  <View
                    style={[styles.progressBar, { width: `${progress}%` }]}
                  />
                )}
                <TouchableOpacity
                  style={actionBtnStyles}
                  onPress={()=>{this.uploadImage()}}
                  disabled={uploading}
                >
                  <View>
                    {uploading ? (
                      <Text style={styles.btnTxt}>Uploading ...</Text>
                    ) : (
                      <Text style={styles.btnTxt}>Upload image</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text
                style={{
                  fontWeight: '600',
                  paddingTop: 20,
                  alignSelf: 'center'
                }}
              >
                {images.length > 0
                  ? 'Your uploaded images'
                  : 'There is no image you uploaded'}
              </Text>
            </View>
            <FlatList
              numColumns={2}
              style={{ marginTop: 20 }}
              data={images}
              renderItem={({ item: image, index }) => (
                <ImageRow
                  windowWidth={windowWidth}
                  image={image}
                  popImage={() => this.removeImage(index)}
                />
              )}
              keyExtractor={index => index}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});

// //==============
  /**
   * Upload image method
   */
  // uploadImage = () => {

  //   uploadImage = (ref, image, imageName) =>{
  //     // console.log(this.state.imgSource)
  //     console.log("FirebaseStorageService :: saveImage ", {ref:ref, image:image, imageName:imageName});
  // // console.log("uri========>",uri)
  //     var firebaseStorageRef = firebase.storage().ref(ref);
  //     const imageRef = firebaseStorageRef.child(imageName + ".jpeg");
  
  //     // console.log("FirebaseStorageService :: imageRef ", {imageRef:imageRef});
  
  
  //     imageRef.putFile(ref, {contentType: 'image/jpeg'}).then(function(){
  //         return imageRef.getDownloadURL();
  //     }).then(function(url){
  //         console.log("Image url==========>", {url:url});
  //         // onSuccess(url);
  //     }).catch(function(error){
  //         // console.log("Error while saving the image.. ", error);
  //         // onError(error);
  //     });
  // }


// import React from 'react';
// import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filePath: {},
//     };
//   }
//   chooseFile = () => {
//     var options = {
//       title: 'Select Image',
//       customButtons: [
//         { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.showImagePicker(options, response => {
//       console.log('Response = ', response);
 
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         let source = response;
//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//         this.setState({
//           filePath: source,
//         });
//       }
//     });
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           {/*<Image 
//           source={{ uri: this.state.filePath.path}} 
//           style={{width: 100, height: 100}} />*/}
//           <Image
//             source={{
//               uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
//             }}
//             style={{ width: 100, height: 100 }}
//           />
//           <Image
//             source={{ uri: this.state.filePath.uri }}
//             style={{ width: 250, height: 250 }}
//           />
//           <Text style={{ alignItems: 'center' }}>
//             {this.state.filePath.uri}
//           </Text>
//           <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
//         </View>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });