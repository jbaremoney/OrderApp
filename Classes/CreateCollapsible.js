import React from 'react';
import CreateDrink from './CreateDrink' //make sure this is the correct path
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class CreateCollapsible extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View contentContainerStyle = {styles.scrollView}>
                <TouchableOpacity style = {styles.collapseButton} onPress={() => (this.props.setCollapsed(!this.props.collapsed))}>
                    
                    <Text style = {styles.text} > {this.props.title} </Text>
                    {this.props.collapsed ? <Icon name = {'caret-down'} color = {'black'} size = {24} />: <Icon name = {'caret-up'} color = {'black'} size = {24} /> }
                    
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      marginBottom: 10,
      borderWidth: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    text: {
        fontSize: 16,
        padding: 3,
    }
  });