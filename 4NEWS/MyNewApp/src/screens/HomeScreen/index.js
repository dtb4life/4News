import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, Image, StatusBar } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';
import CategoryComp from '../../components/Category/CategoryComp';
import NetInfo from '@react-native-community/netinfo'
import * as Animatable from 'react-native-animatable'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import CustomDrawer from '../../components/customs/CustomDrawer';
import { setStatusBarColor, resetStatusBarColor } from '../../utils/StatusBarManager';


const HomeScreen = ({ navigation }) => {


    setTimeout(() => {
        setStatusBarColor('#36d1dc')
    }, 1000);
    const [isFetchingError, setIsFetchingError] = useState(false);
    const [Loading, setIsLoading] = useState(false);
    const [Data, setData] = useState([]);
    const [Select, setSelect] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [Category, SetCategory] = useState([
        {
            id: 1,
            name: 'Top Headlines',
            nameRU: 'Главное',
            category: 'general',
        },
        {
            id: 5,
            name: 'Sports',
            nameRU: 'Спорт',
            category: 'sports',
        },
        {
            id: 2,
            name: 'Business',
            nameRU: 'Бизнес',
            category: 'business',
        },
        {
            id: 3,
            name: 'Entertainment',
            nameRU: 'Развлечения',
            category: 'entertainment',
        },
        {
            id: 4,
            name: 'Health',
            nameRU: 'Здоровье',
            category: 'health',
        },
        {
            id: 6,
            name: 'Science',
            nameRU: 'Наука',
            category: 'science',
        },
        {
            id: 7,
            name: 'Technology',
            nameRU: 'Технологии',
            category: 'technology',
        },
    ])

    const apiKeyList = ["ef0cca7fb1924225a4c6c42e0f32924b", "abc3f76eb9ec4195b35c7c5b3771a40b", "5bb375e99be54883b8b9aee7001fc660", "2c7f28792cc64ca699bfd3bbf2768105"];
    let apiKeyIndex = 0;

    const [isConnected, setIsConnected] = useState(false);
    const [showConnectionStatus, setShowConnectionStatus] = useState(false);

    const getData = async () => {
        try {
            setIsLoading(true)
            const ruResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&category=${Category[Select].category}`);


            if (ruResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData()
                return
                //throw new Error(`RuResponse Error: ${ruResponse.status}`);
            }

            const ruData = await ruResponse.json();

            const usResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&category=${Category[Select].category}`);

            if (usResponse.status === 429) {

                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData()
                return
                //throw new Error(`UsResponse Error: ${usResponse.status}`);
            }

            const usData = await usResponse.json();

            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);
            //console.log(combinedData)
            setData(combinedData);
            setIsRefreshing(false);
            //console.log(combinedData)
            //apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.lrength;
            setIsLoading(false)
        } catch (error) {
            console.error("Error in getData:", error);
            setIsFetchingError(true)
            setIsRefreshing(false);
        }
    };


    const getData2 = async (category) => {
        try {
            //setIsLoading(true)
            const ruResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`);


            if (ruResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData2()
                return
                //throw new Error(`RuResponse Error: ${ruResponse.status}`);
            }

            const ruData = await ruResponse.json();

            const usResponse = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyList[apiKeyIndex]}&category=${category}`);

            if (usResponse.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
                getData2()
                return
                //throw new Error(`UsResponse Error: ${usResponse.status}`);
            }

            const usData = await usResponse.json();
            const combinedData = [...ruData.articles, ...usData.articles];

            combinedData.sort(() => Math.random() - 0.5);

            setData(combinedData);
            setIsRefreshing(false);
            //apiKeyIndex = (apiKeyIndex + 1) % apiKeyList.length;
            setIsLoading(false)
        } catch (error) {
            console.error("Error in getData2:", error);
            setIsFetchingError(true)
            setIsRefreshing(false);
        }
    }


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            if (state.isConnected == true) {
                getData();
                setShowConnectionStatus(true);
                setTimeout(() => {
                    setShowConnectionStatus(false);
                }, 2000);
            }
        });
        getData();

        return () => {
            unsubscribe();
        }
    }, []);


    const onRefresh = () => {
        setIsRefreshing(true);
        getData();
    }

    const [canBeShowed, setCanBeShowed] = useState(false)
    const handleAnimEnd = () => {
        setTimeout(() => {
            setCanBeShowed(true);
        }, 1500);
    }



    return (
        <>
            {!isConnected ? (
                <Animatable.View
                    animation="fadeInDown"
                    duration={1000}
                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                    <Text style={{ fontFamily: 'Inter-Light' }}>Отсутствует интернет-соединение</Text>
                </Animatable.View>
            ) : (
                showConnectionStatus && (
                    <Animatable.View
                        animation="fadeInDown"
                        onAnimationEnd={handleAnimEnd}
                        duration={1000}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', flex: 2, zIndex: 1 }}>
                        <Text style={{ fontFamily: 'Inter-Light' }}>Подключение установлено!</Text>
                    </Animatable.View>
                )
            )
            }

            {/* TODO: Lottie */}
            {Loading ? (

                <View style={styles.load}>

                    <ActivityIndicator
                        color={'#754da6'}
                        size={36}>
                    </ActivityIndicator>
                </View>) : (
                canBeShowed && (
                    <CustomDrawer type="Новости" showSearch="true" backgroundColor="#7371FC" navigation={navigation}>
                        <View style={{ flex: 1 }}>

                            {/* <Header navigation={navigation} /> */}

                            <Animatable.View
                                animation="fadeIn"
                                duration={1500}
                                style={styles.horList}>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={Category}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={index == Select ?
                                                    styles.selListItem : styles.horListItem}
                                                onPress={() => {
                                                    setSelect(index)
                                                    getData2(Category[index].category)
                                                    //onRefresh()
                                                }}
                                            >
                                                <Text
                                                    style={index == Select ?
                                                        styles.selListText : styles.horListText}>{item.nameRU}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </Animatable.View>

                            {/* <View style={{ flex: 1 }}>
        <View style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
        }}>
            <FlatList
                horizontal
                showsHorizonatlScrollIndicator={false}
                data={Data.filter(item => item.urlToImage != null).slice(0, 6)}
                renderItem={({ item, index }) => {
                    return <HorFlatList item={item} />;
                }}
            />
        </View>
    </View> */}
                            {/* <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
    >

        <View style={{
            flex: 1,
            backgroundColor: '#8BC6EC',
            paddingTop: 20,
            zIndex: 1,
            position: 'relative',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25
        }}>
            <Text style={styles.heading}>
                Что мы можем предложить Вам сегодня:
            </Text>
            <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <CategoryComp
                        imageUri={require('../assets/images/seved.png')}
                        name="Спорт"
                    />
                    <CategoryComp
                        imageUri={require('../assets/images/seved.png')}
                        name="Развлечения"
                    />
                    <CategoryComp
                        imageUri={require('../assets/images/seved.png')}
                        name="Здоровье"
                    />
                </ScrollView>
            </View> */}
                            {/* <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 24, fontFamily: 'Inter-Bold' }}>
                    Lorem ipsum ...
                </Text>
                <Text style={{ marginTop: 10, fontFamily: 'Inter-Light' }}>
                    Lorem ipsum ...  Lorem ipsum ...  Lorem ipsum ...  Lorem ipsum ...
                </Text>
            </View> */}
                            {/* </View>

    </ScrollView> */}

                            <View style={{ flex: 2 }}>
                                <View style={{ height: Dimensions.get("window").height * 0.78 }}>
                                    <FlatList
                                        style={{ flex: 1, zIndex: 100, position: 'relative' }}
                                        showsVerticalScrollIndicator={false}
                                        onRefresh={onRefresh}
                                        refreshing={isRefreshing}
                                        data={Data}
                                        renderItem={({ item, index }) => {
                                            return <Card item={item} navigation={navigation} />;
                                        }}
                                    />
                                </View>
                            </View>


                        </View>
                    </CustomDrawer>
                )


            )}

            {/* <Tab.Navigator screenOptions={screenOptions} initialRouteName='Домашняя страница'>
                <Tab.Screen name="Домашняя страница" component={HomeScreen} />
                <Tab.Screen name="Добро пожаловать !" component={SignInScreen} />
            </Tab.Navigator> */}
        </>

    );


}

export default HomeScreen;

const styles = StyleSheet.create({
    heading: {
        fontFamily: "Inter-Bold",
        fontSize: 24,
        paddingHorizontal: 20
    },
    load: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    horList: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    horListItem: {
        backgroundColor: '#8EBBF3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 12,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,

    },

    selListItem: {
        backgroundColor: '#754da6',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 12,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 0.5,
    },

    horListText: {
        //fontWeight: '500',
        color: '#383738',
        fontFamily: "Inter-Bold",

    },

    selListText: {
        //fontWeight: 'bold',
        fontFamily: "Inter-Bold"
    }

})