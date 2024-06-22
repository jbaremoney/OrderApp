//TODO make this screen funcitonal, as it just displays text.


//This works in two ways, one using the CreateCollapsible.js class, and one hard coding. I'm leaving both here in case we want
//To use either, but I will be using the class method moving forward because I worked hard on it :p

//import CreateDrink from '../Classes/CreateDrink' //make sure this is the correct path
import CreateCollapsible from '../Classes/CreateCollapsible';
import React from 'react';
import { View, StyleSheet, Text, Button, Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Styles from '../mainStuff/StyleSheet'


export default function Screen2() {
  // const [firstCollapsed, setFirstCollapsed] = React.useState(true)
  // const [secondCollapsed, setSecondCollapsed] = React.useState(true)

  // const toggleFirstExpand = () => {
  //   setFirstCollapsed(!firstCollapsed)
  // }

  // const toggleSecondExpand = () => {
  //   setSecondCollapsed(!secondCollapsed)
  // }

    const info = [
      { name: 'dollarita', price: '2.50', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'fortnite', price: '1000.00', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'dookie', price: '4322345.22', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'dollarita', price: '2.50', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
    ];

    const [firstCollapsed, setFirstCollapsed] = React.useState(true)
    const [secondCollapsed, setSecondCollapsed] = React.useState(true)


    return (
        <ScrollView contentContainerStyle = {Styles.scrollView}>
          <CreateCollapsible
              title = "First Drink"
              info = {info}
              collapsed = {firstCollapsed}
              setCollapsed = {setFirstCollapsed}
          />
          <CreateCollapsible
            title = 'Second Drink'
            info = {info}
            collapsed = {secondCollapsed}
            setCollapsed = {setSecondCollapsed}
          />
          {/* <TouchableOpacity style = {styles.collapseButton} onPress={toggleFirstExpand}>
            <Text > First Drink </Text>
          </TouchableOpacity>
          <Collapsible collapsed = {firstCollapsed}>
            <Text> Order Screen </Text>
            <CreateDrink name = 'dollarita' price = '2.50' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <CreateDrink name = 'fortnite' price = '300.00' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <CreateDrink name = 'dookie' price = '10000.00' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <CreateDrink name = 'dollarita' price = '2.50' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <Text>dookie shart</Text>
          </Collapsible>

          <TouchableOpacity style = {styles.collapseButton} onPress={toggleSecondExpand}>
            <Text > Second Drink </Text>
          </TouchableOpacity>
          <Collapsible collapsed = {secondCollapsed}>
            <Text> Order Screen </Text>
            <CreateDrink name = 'dollarita' price = '2.50' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <CreateDrink name = 'fortnite' price = '300.00' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <CreateDrink name = 'dookie' price = '10000.00' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <CreateDrink name = 'dollarita' price = '2.50' imageLink = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png' ></CreateDrink>
            <Text>dookie shart</Text>
          </Collapsible> */}
        </ScrollView>
    );
}
