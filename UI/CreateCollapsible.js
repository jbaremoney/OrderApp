import React from 'react';
import CreateDrink from './CreateDrink' //make sure this is the correct path
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './StyleSheet'


export default class CreateCollapsible extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View contentContainerStyle = {Styles.scrollView}>
                <TouchableOpacity style = {Styles.collapseButton} onPress={() => (this.props.setCollapsed(!this.props.collapsed))}>
                    
                    <Text style = {Styles.text} > {this.props.title} </Text>
                    {this.props.collapsed ? <Icon name = {'caret-down'} color = {'black'} size = {24} />: <Icon name = {'caret-up'} color = {'black'} size = {24} /> }
                    
                </TouchableOpacity>
                <Collapsible collapsed = {this.props.collapsed}>
                    {this.props.info.map((drink, index) => (
                        <CreateDrink key = {index} name = {drink['name']} price = {drink['price']} imageLink = {drink['imageLink']} ></CreateDrink>
                    ))}
                </Collapsible>
            </View>
        );
    }
}
