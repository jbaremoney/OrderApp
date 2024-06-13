//TODO make this screen funcitonal, as it just displays text.
//import CreateDrink from "../../Components/CreateDrink"; 
import CreateDrink from '../Classes/CreateDrink' //make sure this is the correct path
import React from 'react';
import { View, StyleSheet, Text, Button, Image} from 'react-native';


export default function Screen2() {
    //var drink1 = new CreateDrink('Dollarita', '2.50', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png')
    return (
      <View style = {styles.container}>
        <Text> Order Screen </Text>
        <CreateDrink name = 'dollarita' price = '2.50' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
        <CreateDrink name = 'fortnite' price = '300.00' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
        <CreateDrink name = 'dookie' price = '10000.00' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
        <CreateDrink name = 'dollarita' price = '2.50' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>

        {/* <Drink
          name = 'dollarita'
          price = '2.50'
          imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'
        /> */}
        <Text>dookie shart</Text>
      </View>
    );
  }

styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 300,
    height: 300,
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