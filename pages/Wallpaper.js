import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, View, Image } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';

var imageList_11 = [{'id':'1','image': require('../Image/wall-1.jpeg') },
                    {'id':'2','image': require('../Image/wall-2.jpeg') },
                    {'id':'3','image': require('../Image/wall-3.jpeg') },
                    {'id':'4','image': require('../Image/wall-4.jpeg') }
                    ]
const imageList_22 =[ {'id':'5','image':require('../Image/wall-5.jpeg')},
                      {'id':'6','image':require('../Image/wall-6.jpeg')},
                      {'id':'7','image':require('../Image/wall-7.jpeg')},
                      {'id':'8','image':require('../Image/wall-8.jpeg')}
                    ]
const imageList_33 =[ {'id':'9','image':require('../Image/wall-9.jpeg')},
                      {'id':'10','image':require('../Image/wall-10.jpeg')},
                      {'id':'11','image':require('../Image/wall-11.jpg')},
                      {'id':'12','image':require('../Image/wall-12.jpeg')}
                    ]
const imageList_44 =[ {'id':'13','image':require('../Image/wall-13.jpg')},
                      {'id':'14','image':require('../Image/wall-14.jpeg')},
                      {'id':'15','image':require('../Image/wall-15.jpeg')},
                      {'id':'16','image':require('../Image/wall-16.jpeg')},
                    ]

const imageList_55 =[ { 'id':'17','image': require('../Image/wall-2.jpeg')},
                      { 'id':'18','image': require('../Image/wall-3.jpeg')},
                      { 'id':'19','image': require('../Image/wall-4.jpeg')},
                      {'id':'20','image':require('../Image/wall-17.jpeg')},
                    ]

export default class Wallpaper extends Component {

  render() {

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
        <View >
          <FlatList
            data={imageList_11} horizontal={true}
            renderItem={({item}, index) => <View style={styles.imageContainer}><Image style={styles.photo} source={item.image}/></View>
            }
          />
        </View>

         <View>
          <FlatList
            data={imageList_22} horizontal={true}
            renderItem={({ item }, index) => <View style={styles.imageContainer}><Image style={styles.photo} source={item.image}/></View>
            }
          />
        </View>
        <View >
          <FlatList
            data={imageList_33} horizontal={true}
            renderItem={({ item },index) => <View style={styles.imageContainer}><Image style={styles.photo} source={item.image}/></View>
            }
          />
        </View>
         <View >
          <FlatList
            data={imageList_44} horizontal={true}
            renderItem={({ item }, index) => <View style={styles.imageContainer}><Image style={styles.photo} source={item.image}/></View>
            }
          />
        </View>

       <View >
          <FlatList
            data={imageList_55} horizontal={true}
            renderItem={({ item }, index) => <View style={styles.imageContainer}><Image style={styles.photo} source={item.image}/></View>
            }
          />
        </View>

        <View >
          <FlatList
            data={imageList_33} horizontal={true}
            renderItem={({ item }, index) => <View style={styles.imageContainer}><Image style={styles.photo} source={item.image}/></View>
            }
          />
        </View> 
        </ScrollView>

        {/* <View style={styles.Photo2}>{imageList_11.map((item) => {
            return (

              <View style={styles.Photo}>
                <Image style={styles.Photo} source={item.image} />
              </View>)
              { height: 200, backgroundColor: 'lightgreen' }

          })}
          </View> */}

      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  safeArea:{
    marginLeft:5,
    marginRight:5,
    width:'97%',
    height:'100%'
  },
  imageContainer:{
    width: 183,
    height: 200,
  },

  photo: {
    height: 200,
    alignItems: 'center'

  }
})