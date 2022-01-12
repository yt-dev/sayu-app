/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Text, Animated, View} from 'react-native';

interface ToastProps {
  message: string;
  onHide: () => void;
}
export const Toast: React.FC<ToastProps> = props => {
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
