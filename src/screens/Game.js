import { Animated, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';

function Card( { dispatch, card, game } ) {
    const flipAnimation = useRef( new Animated.Value( 0 ) ).current;
    let flipRotation = 0;
    flipAnimation.addListener( ( { value } ) => flipRotation = value );
    const flipToFrontStyle = {
      transform: [
        { rotateY: flipAnimation.interpolate( {
          inputRange: [ 0, 180 ],
          outputRange: [ "0deg", "180deg" ]
        } ) }
      ]
    };
    const flipToBackStyle = {
      transform: [
        { rotateY: flipAnimation.interpolate( {
          inputRange: [ 0, 180 ],
          outputRange: [ "180deg", "360deg" ]
        } ) }
      ]
    };
const flipToFront = () => {
    Animated.timing( flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    } ).start();
  };
  const flipToBack = () => {
    Animated.timing( flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    } ).start();
  };
return (
    <Pressable
      style={ style.cardWrapper }
      onPress={ () => !!flipRotation ? flipToBack() : flipToFront() }
    >
      <Animated.Image
        style={ { ...style.cardFront, ...flipToBackStyle } }
        source={ require( <card front>) }
      />
      <Animated.Image
        style={ { ...style.cardBack, ...flipToFrontStyle } }
        source={ require( <card back> ) }
      />
    </Pressable>
  );
}