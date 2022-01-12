/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Center} from './Center';

const getRandomMessage = () => {
  const number = Math.trunc(Math.random() * 10000);
  return 'Random message ' + number;
};

interface MessageProps {
  message: string;
  onHide: () => void;
}
const Message: React.FC<MessageProps> = props => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, [opacity, props]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          margin: 10,
          marginBottom: 5,
          padding: 12,
          borderRadius: 20,
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 6,
        }}>
        <Text>{props.message}</Text>
      </View>
    </Animated.View>
  );
};

export const DummyComponentForTest = () => {
  const [messages, setMessages] = useState([]);

  return (
    <>
      <SafeAreaView />

      <View
        style={{
          position: 'absolute',
          top: 45,
          left: 0,
          right: 0,
        }}>
        {messages.map(message => (
          <Message
            key={message}
            message={message}
            onHide={() => {
              setMessages(messages =>
                messages.filter(currentMessage => currentMessage !== message),
              );
            }}
          />
        ))}
      </View>

      <Center>
        <Button
          title="Add message"
          onPress={() => {
            const message = getRandomMessage();
            setMessages([...messages, message]);
          }}
        />
      </Center>
    </>
  );
};
