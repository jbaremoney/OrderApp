//TODO make this screen funcitonal, as it just displays text.


//This works in two ways, one using the CreateCollapsible.js class, and one hard coding. I'm leaving both here in case we want
//To use either, but I will be using the class method moving forward because I worked hard on it :p

//import CreateDrink from '../Classes/CreateDrink' //make sure this is the correct path
import CreateCollapsible from '../UI/CreateCollapsible';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView} from 'react-native';
import Styles from '../UI/StyleSheet'
import {db} from '../firebaseStuff/firebaseConfig'; // Path to your firebaseConfig.js
import { collection, getDocs } from 'firebase/firestore';




// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import firebase from '../firebaseStuff/firebaseConfig'; // Path to your firebaseConfig.js

// const YourComponent = () => {
//   const [dataArray, setDataArray] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const snapshot = await firebase.database().ref('/bars/JoeBlacks-/drinks').once('value');
//         const data = snapshot.val();
//         if (data) {
//           const dataArray = Object.keys(data).map(key => ({ key, ...data[key] }));
//           setDataArray(dataArray);
//         }
//       } catch (error) {
//         console.log('Error fetching data: ', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // You can now use dataArray elsewhere in your component or pass it as props

//   return (
//     <View>
//       {/* Example of using the data array */}
//       <Button
//         title="Log Data Array"
//         onPress={() => console.log(dataArray)}
//       />

//       {/* Render the fetched data if needed */}
//       <View>
//         {dataArray.map(item => (
//           <View key={item.key}>
//             <Text>{item.name}</Text>
//             <Text>{item.description}</Text>
//             {/* Add other fields as needed */}
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default YourComponent;

export default function Screen2() {
    const info = [
      { name: 'dollarita', price: '2.50', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'fortnite', price: '1000.00', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'dookie', price: '4322345.22', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'dollarita', price: '2.50', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
    ];

    const [firstCollapsed, setFirstCollapsed] = useState(true)
    const [secondCollapsed, setSecondCollapsed] = useState(true)

    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
      const fetchBars = async () => {
        try {
          console.log("Fetching drinks...");
          const drinkCollection = collection(db, 'bars/JoeBlacks-/drinks');
          const drinkSnapshot = await getDocs(drinkCollection);
          //console.log("Bars snapshot: ", barsSnapshot);
          const drinkList = drinkSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log("Drink list: ", drinkList);
          setDrinks(drinkList);
        } catch (error) {
          //setError(error);
          console.error("Error fetching bars: ", error);
        // } finally {
        //   setLoading(false);
        }
      };
  
      fetchBars();
    }, []);

    return (
        <ScrollView contentContainerStyle = {Styles.scrollView}>
          <Text style = {Styles.text}></Text>
          <CreateCollapsible
              title = "First Drink"
              info = {drinks}
              collapsed = {firstCollapsed}
              setCollapsed = {setFirstCollapsed}
          />
          <CreateCollapsible
            title = 'Second Drink'
            info = {info}
            collapsed = {secondCollapsed}
            setCollapsed = {setSecondCollapsed}
          />
        </ScrollView>
    );
}
