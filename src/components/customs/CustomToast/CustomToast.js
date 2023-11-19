import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { assets } from '../../../../react-native.config';

const CustomToast = ({ message, onClose }) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }
        ).start();

        const timer = setTimeout(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }
            ).start(onClose);
        }, 2000);

        return () => clearTimeout(timer);
    }, [fadeAnim, onClose]);

    return (
        <Animated.View

            style={[
                styles.toastContainer,
                {
                    opacity: fadeAnim,
                },
            ]}
        >
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        bottom: '5%',
        left: 20,
        right: 20,
        backgroundColor: 'rgb(8 47 73)',
        padding: 10,
        borderRadius: 5,
        zIndex: 100
    },
    toastText: {
        color: '#fff',
        fontFamily: 'Inter-Light'
    },
});

export default CustomToast;
