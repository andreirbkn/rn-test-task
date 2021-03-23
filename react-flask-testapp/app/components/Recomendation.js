import { getAppLoadingLifecycleEmitter } from "expo/build/launch/AppLoading";
import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


const server_address = "http://192.168.1.183:5000";

const images = {
  ratings: {
    '0': require("../assets/rating-0.png"),
    '1': require("../assets/rating-1.png"),
    '2': require("../assets/rating-2.png"),
    '3': require("../assets/rating-3.png"),
    '4': require("../assets/rating-4.png"),
    '5': require("../assets/rating-5.png"),
}
}

export default class Recomendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      page: 1,
      error: null,
      refreshing: false,
    };
  }

  _makeRequest = () => {
    const page = this.state.page;
    const url = server_address + '/api/get_course?page='+page;

    this.setState({isLoading: true});
    fetch(url, {})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.concat(responseJson),
          error: responseJson.error || null,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({error, isLoading: false, refreshing: false,})
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  }

  handleLoadMore = () => {
    
    this.setState({
      page: this.state.page +1,
      refreshing: true,
    },
    () => 
    {
      this._makeRequest();
    })
    console.log('Getting more!')
    console.log('Page n' + this.state.page)
    console.log(this.state.dataSource)
  }

  componentDidMount() {
    this._makeRequest();
  }

  addDefaultSrc(ev) {
    ev.target.src = baseUrl + "/static/images/no-image.jpg";
  }

  lenghtString(number) {
      var lastDigit = number % 10
      var string = " часов"
      if(lastDigit == 1){
        string = " час"
      }
      if(lastDigit > 1 && lastDigit < 5){
        string = " часа"
      }
      return lastDigit.toString() + string 
  }


  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemPictureBox}>
          <Image
            style={styles.itemPicture}
            source={{ uri: server_address + item.image_url }}
          />
        </View>
        <View style={styles.itemBox}>
          <View style={styles.ratingRow}>
            <Image
              source={images.ratings[Math.round(item.avg)]}
              style={{marginRight:7, width: 90, height: 15 }}
            />
            <Text style={{ fontWeight: "bold" }}>{Math.round(item.avg,2)}</Text>
            <Text style={{ marginLeft:7, fontSize: 13 }}>Оценки: {item.count}</Text>
          </View>

          <Text style={{ width: "100%", marginVertical: 5,}}>{item.title}</Text>

          <View style={styles.lengthRow}>
            <Image
              source={require("../assets/clock-icon.png")}
              style={styles.clockIcon}
            />
            <Text style={{fontSize:12,    marginTop:2,}}>{this.lenghtString(item.length)}</Text>
          </View>
          <View style={{flexGrow:1,}}></View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.h3}>Рекомендации</Text>
          <FlatList
            style={styles.flatList}
            data={this.state.dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  h3: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    padding: 5,
    marginBottom:15,
    paddingHorizontal: 40,
  },
  MainContainer: {
    flex:1,
  },
  item: {
    flexDirection: "row",
    marginVertical: 15,
    paddingHorizontal:30,
  },
  itemPictureBox: {
    width: 110,
    height: 145,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.28,
    shadowRadius: 1.0,
    elevation: 5,
  },
  itemPicture: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
  },
  flatList: {
    height:'100%',

  },
  itemBox: {
    flex: 1,
    flexWrap: "wrap",

    marginLeft: 30,
  },
  ratingRow: { 
    flexDirection: "row", 
    flexWrap: "wrap" ,
    marginVertical: 2,
  },
  lengthRow: { 
    flexDirection: "row", 
    paddingVertical: 5,
  },
  clockIcon: {
    marginRight: 15,
 
    width: 20, 
    height: 20,
    backgroundColor: 'green',
  }
});
