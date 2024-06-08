import React from 'react';
import { View, StyleSheet, Text, Button, Image} from 'react-native';
import PropTypes from 'prop-types';


//myClass.js
export default class CreateDrink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <View style = {this.styles.container}>
            <Image style={this.styles.image}
              source={{uri : this.props.imageLink}}
            />
            <View style = {this.styles.subContainer}>
              <Text style = {this.styles.text}>
                {this.props.name} - ${this.props.price}
              </Text>
              <Button 
                style = {this.styles.button}
                title = 'Add to Cart'
              />
            </View>
          </View>
        );
      }
    
    styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        subContainer: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'pink',
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: 200,
            height: 200,
        },
        text: {
          fontSize: 16,
          padding: 10,
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            padding: 10,
            marginBottom: 10,
          }
      });
  }
  
  CreateDrink.propTypes = { name: PropTypes.string.isRequired, price: PropTypes.string.isRequired, imageLink: PropTypes.string.isRequired };