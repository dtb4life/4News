import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import RadialGradient from 'react-native-radial-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../components/Card';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
    //const navigation = useNavigation();
    const [SearchText, setSearchText] = useState('')
    const [Data, setData] = useState([])


    const apiKeyList = ["ef0cca7fb1924225a4c6c42e0f32924b", "abc3f76eb9ec4195b35c7c5b3771a40b", "5bb375e99be54883b8b9aee7001fc660", "2c7f28792cc64ca699bfd3bbf2768105"];
    let apiKeyIndex = 0;
    let searchTimer = null;

    const searchNews = async (text) => {
        try {
            //setSearchText(text)

            if (searchTimer) clearTimeout(searchTimer)

            searchTimer = setTimeout(async () => {
                //console.warn("Первый" + apiKeyList[apiKeyIndex])
                const ruResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`);

                if (ruResponse.status === 429) {
                    apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                    searchNews(text)
                    return
                    //throw new Error(`RuResponse Error: ${ruResponse.status}`);
                }

                const ruData = await ruResponse.json();

                const usResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&q=${text}`);

                if (usResponse.status === 429) {

                    apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                    searchNews(text)
                    return
                    //throw new Error(`UsResponse Error: ${usResponse.status}`);
                }

                const usData = await usResponse.json();

                const combinedData = [...ruData.articles, ...usData.articles];

                //combinedData.sort(() => Math.random() - 0.5);

                setData(combinedData);
            }
            )




        } catch (error) {
            console.error("Error in SearchNews:", error);
        }
    }

    const handleTextChange = (text) => {
        setSearchText(text);
        searchNews(text);
    };

    return (
        <Animatable.View style={styles.searchRoot} animation="fadeIn" duration={1500}>
            <RadialGradient
                style={{ flex: 1 }}
                colors={['#36d1dc', '#5b86e5']}
                stops={[0.1, 0.9]}
                center={[100, 360]}
                radius={500}
            >
                <Animatable.View
                    style={styles.search}
                    animation="fadeIn" duration={1000}
                >
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Домашняя страница")
                    }}>
                        <Icon
                            style={styles.arrow}
                            name="arrow-left"
                            size={24}
                            color="#F7F6C5"

                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{ fontSize: 16, width: '100%' }}
                        placeholder='Что будем искать?'
                        placeholderTextColor={'white'}
                        onChangeText={handleTextChange}
                        selectionColor={'#F7F6C5'}
                        value={SearchText}
                        maxLength={20}
                    />
                </Animatable.View>
                <View>
                    <FlatList
                        data={Data}
                        renderItem={({ item, index }) => {
                            return <Card item={item} navigation={navigation} />;
                        }}
                    />
                </View>

                {/* TODO: Lottie */}
                {Data.length === 0 && (
                    <View>
                        <LottieView style={styles.lottie}
                            source={require("../screens/assets/animations/news.json")}
                            autoPlay={true}
                            loop={true} />
                    </View>
                )}
            </RadialGradient>
        </Animatable.View>
    );
}

export default Search;

const styles = StyleSheet.create({
    searchRoot: {
        flex: 1,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8EBCF3',
        borderWidth: 0.25,
        borderColor: "white",
        elevation: 1,
        paddingHorizontal: 10
    },
    arrow: {
        // marginLeft: '2%',
        marginRight: '5%'
    },
    lottie: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        height: width,
        marginTop: '30%'
    },
})