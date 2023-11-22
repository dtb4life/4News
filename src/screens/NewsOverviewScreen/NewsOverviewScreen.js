import { View, Text, Image, StatusBar, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import Card from '../../components/Card';
//import { ruCaptions } from '../../constants/Images';

const NewsOverviewScreen = ({ route, navigation }) => {
    const { apiKeyList, apiKeyIndex, caption, ruCaption } = route.params;
    console.log(apiKeyList);
    console.log(apiKeyIndex);

    let newApiKeyList = [...apiKeyList];
    let newApiKeyIndex = apiKeyIndex;

    const [isLoading, setIsLoading] = useState(false);

    const [Data, setData] = useState([]);

    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);

    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var day = ('0' + currentDate.getDate()).slice(-2);

    var formattedDate = year + '-' + month + '-' + day;
    console.log(formattedDate);

    const newsWebsites = ['Газета.Ru', 'Lenta.ru'];

    const getDataByQ = async () => {
        try {
            setIsLoading(true);

            let apiEndpoint;

            if (newsWebsites.includes(ruCaption)) {
                apiEndpoint = `domains=${ruCaption === 'Газета.Ru' ? 'gazeta.ru' : 'lenta.ru'
                    }&apiKey=${newApiKeyList[newApiKeyIndex]}`;
            } else {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=${caption.toLowerCase()}&from=${formattedDate}&to=${currentDate}&sortBy=publishedAt&apiKey=${newApiKeyList[newApiKeyIndex]
                    }`,
                );
                const ruResponse = await fetch(
                    `https://newsapi.org/v2/everything?q=${ruCaption.toLowerCase()}&from=${formattedDate}&to=${currentDate}&sortBy=publishedAt&apiKey=${newApiKeyList[newApiKeyIndex]
                    }`,
                );

                if (response.status === 429 || ruResponse.status === 429) {
                    newApiKeyIndex = (newApiKeyIndex + 1) % newApiKeyList.length;
                    getDataByQ();
                    return;
                }

                const fetchedData = await response.json();
                const rusFetchedData = await ruResponse.json();
                const Data = [...rusFetchedData.articles, ...fetchedData.articles];

                setData(Data);
                setIsLoading(false);
                return;
            }
            const response = await fetch(
                `https://newsapi.org/v2/everything?${apiEndpoint}`,
            );

            if (response.status === 429) {
                newApiKeyIndex = (newApiKeyIndex + 1) % newApiKeyList.length;
                getDataByQ();
                return;
            }

            const fetchedData = await response.json();
            setData(fetchedData.articles);
            setIsLoading(false);
        } catch (error) {
            console.error('Error in getDataByQ:', error);
        }
    };

    useEffect(() => {
        console.log(ruCaption.toLowerCase());
        console.log(caption);
        setIsLoading(true);
        getDataByQ();
    }, []);

    return (
        <>
            <StatusBar backgroundColor={'transparent'} />
            <View style={{ flex: 1 }}>
                <Image
                    blurRadius={200}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={require('../assets/images/newsoverview.jpg')}
                />
                {isLoading ? (
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Progress.CircleSnail thickness={10} size={140} color="white" />
                    </View>
                ) : (
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={Data}
                            renderItem={({ item, index }) => {
                                return <Card item={item} navigation={navigation} data={Data} />;
                            }}
                        />
                    </View>
                )}
            </View>
        </>
    );
};

export default NewsOverviewScreen;
