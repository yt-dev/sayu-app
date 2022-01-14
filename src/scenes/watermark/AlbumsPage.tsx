import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {Masthead} from 'components';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import {Fab, Icon, useColorModeValue} from 'native-base';

type AlbumsPageProps = NativeStackScreenProps<Routes, 'AlbumsPage'>;
export const AlbumsPage: React.FC<AlbumsPageProps> = ({navigation}) => {
  const [groupName, setGroupName] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const color = isDarkMode ? Colors.white : Colors.black;

  const onPress = () => {
    if (!groupName) {
      Alert.alert('Please enter a group name');
      return;
    }
    navigation.navigate('CameraPage', {groupName});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, backgroundStyle]}>
          <Masthead
            title="Watermark Lite"
            image={require('../../assets/images/banner.png.webp')}
          />
          <View style={styles.roundRectangle}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentInsetAdjustmentBehavior="automatic">
              <Text style={{...styles.title, color}}>
                New group based on reference number
              </Text>
              <TextInput
                value={groupName}
                onChangeText={setGroupName}
                placeholder="Type reference number"
                style={{...styles.input, color}}
              />
            </ScrollView>
          </View>
          <Fab
            position="absolute"
            renderInPortal={false}
            size="sm"
            icon={
              <IonIcon
                name="arrow-forward-circle-outline"
                color="#fff"
                size={33}
              />
            }
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            bg={useColorModeValue('blue.500', 'blue.400')}
            onPress={onPress}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  roundRectangle: {
    flex: 1,
    marginTop: -20,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
});
