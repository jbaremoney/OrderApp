import React from 'react';
import CreateDrink from './CreateDrink' //make sure this is the correct path
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';


export default class CreateCollapsible extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View contentContainerStyle = {styles.scrollView}>
                <TouchableOpacity style = {styles.collapseButton} onPress={() => (this.props.setCollapsed(!this.props.collapsed))}>
                    <Text > {this.props.title} </Text>
                </TouchableOpacity>
                <Collapsible collapsed = {this.props.collapsed}>
                    {this.props.info.map((drink, index) => (
                        <CreateDrink key = {index} name = {drink.name} price = {drink.price} imageLink = {drink.imageLink} ></CreateDrink>
                    ))}
                </Collapsible>
            </View>
        );
    }
}

styles = StyleSheet.create({
    scrollView: {
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 20,
      margin: 10,
    },
    collapseButton: {
      backgroundColor: 'green',
      padding: 10,
      marginBottom: 10,
      borderWidth: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    }
  });