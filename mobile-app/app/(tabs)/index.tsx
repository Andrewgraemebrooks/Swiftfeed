import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          onPress={onPress}
          name="add"
          color={'red'}
          size={30}
          style={{ paddingRight: 10 }}
        />
      ),
    });
  }, [navigation]);

  const onPress = () => {
    console.log('wesh');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
