// //TODO make this screen funcitonal, as it just displays text. 

// import React from 'react';
// import { View, Text} from 'react-native';

// export default function Screen1() {
//     return (
//       <View>
//         <Text> Gift Screen </Text>
//       </View>
//     );
//   }
import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import styles from '../UI/StyleSheet';

const ProgressBart = () => {
  const [points, setPoints] = useState(0);

  const handlePress = () => {
    setPoints(30);
  };

  return (
    <View style = {styles.rewardsContainer}>
      <Text>Points: {points}</Text>
      <ProgressBar progress={points/1000} width={300} height={20} />
      <Button onPress={handlePress} title="Show Rewards" />
      {/* <Text>Progress: {(progress * 100).toFixed(0)}%</Text> */}
      <Text style = {styles.headerText}>Reward Options:</Text>
      <TouchableOpacity>
      <Image 
        style={{height: 300, width: 300}}
        source={{ //image from online
          uri: 'https://i1.sndcdn.com/artworks-7OWSlgqDqCvnKeRg-JqOI3g-t500x500.jpg',
        }}
      />
      </TouchableOpacity>
    </View>
  );
}
export default ProgressBart;