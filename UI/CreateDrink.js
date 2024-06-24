import React from 'react';
import { View, StyleSheet, Text, Button, Image} from 'react-native';
import Styles from '../mainStuff/StyleSheet'

export default class CreateDrink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <View style =  {Styles.createDrinkContainer}>
            <Image style={Styles.image}
              source={{uri : this.props.imageLink}}
            />
            <View style = {Styles.subContainer}>
              <Text style = {Styles.text}>
                {this.props.name} - ${this.props.price}
              </Text>

              <Button 
                style = {Styles.button}
                title = 'Add to Cart'
              />
            </View>
          </View>
        );
      }
  }
  