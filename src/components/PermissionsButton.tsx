import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle, Text } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

export const PermissionsButton = ({ title, onPress, style = {} }: Props) => {
  return (
    <TouchableOpacity
        onPress={ onPress }
        activeOpacity={ 0.9 }
        style={{
            ...style as any,
            ...styles.permissionButton
        }}    
    >
        <Text style={ styles.buttonText }>{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    permissionButton: {
        height: 45,
        width: 200,
        backgroundColor: '#A435F0',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 3

    },
    buttonText: {
        color: '#FFF',
        fontSize: 18, 
        fontWeight: 'bold'
    } 
});