import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/seved.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { Container } from './styles';

const SignInScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("Вход");
    }

    const onForgotPassword = () => {
        console.warn("Забыли пароль");
    }

    const onSignInGoogle = () => {
        console.warn("Вход через Google");
    }

    const onSignInVK = () => {
        console.warn("Вход через ВКонтакте");
    }

    const onSignUpPress = () => {
        console.warn("Регистрация");
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, { height: height * 0.17 }]} resizeMode="contain" />
                <CustomInput
                    placeholder="Имя пользователя или эл. почта"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Пароль"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomButton
                    text="Войти"
                    onPress={onSignInPressed}
                />
                <CustomButton
                    text="Забыли пароль?"
                    onPress={onForgotPassword}
                    type="Tertiary"
                />

                <CustomButton
                    text="Google"
                    onPress={onSignInGoogle}
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
                <CustomButton
                    text="ВКонтакте"
                    onPress={onSignInVK}
                    bgColor="#CFD8F7"
                    fgColor="#154ED3"
                />

                <CustomButton
                    text="Нет аккаунта? Создать сейчас"
                    onPress={onSignUpPress}
                    type="Tertiary"
                />

            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        marginTop: '20%',
        marginBottom: '5%',
        width: '70%',
        maxWidth: 500,
        maxHeight: 200,

    }
})

export default SignInScreen;