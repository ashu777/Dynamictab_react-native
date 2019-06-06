/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ActivityIndicator, View} from 'react-native';
import {Container, Tab, Tabs,ScrollableTab} from "native-base";

export default class App  extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render(){
    
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    else{
      subjects = this.state.dataSource;
      items = subjects.map((item, key) =>
          <Tab heading={item.title}>
              <Text>{item.releaseYear}</Text>
          </Tab>
      );
    }

    return(
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />} >
          {items}
        </Tabs>
      </Container>
    );
  }
}

