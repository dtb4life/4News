import { View, Text, Image, StatusBar, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import CustomDrawer from '../../components/customs/CustomDrawer';
import { Icons } from '../../components/Icons';
import TypeWriter from 'react-native-typewriter';
import CustomButton from '../../components/customs/CustomButton';
import InfoCarousel from './components/InfoCarousel';
import SQLite from 'react-native-sqlite-storage';
import { fetchData, downloadFile, fetchAllUsers } from './db/databaseUtils';
import AppInfoCarousel from './components/appInfoCarousel';
import { formatDate } from './utils/formateDate';
import Loader from '../../components/MovieNewsComponents/Loader';
import AboutApp from './components/AboutApp';
import UserTable from './components/UserTable';
import TablesCarousel from './components/TablesCarousel';

export default function AdminScreen({ navigation }) {
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const [isLoading, setIsLoading] = useState(true);

    const [InfoCarouselActiveSlide, SetInfoCarouselActiveSlide] = useState(0);
    const [AppInfoCarouselActiveSlide, SetAppInfoCarouselActiveSlide] =
        useState(2);
    const [TablesCarouselActiveSlide, SetTablesCarouselActiveSlide] = useState(0);

    const [canBeShowed, setCanBeShowed] = useState(false);

    const [data, setData] = useState([]);
    const [appData, setAppData] = useState([]);

    const [usersData, setUsersData] = useState([]);

    const [tablesData, setTablesData] = useState([
        {
            id: 1,
            icon: <Icons.FontAwesome5 name="users" size={90} />,
            name: 'Таблица Пользователей',
        },
        {
            id: 2,
            icon: <Icons.Entypo name="mask" size={90} />,
            name: 'Таблица Гостей'
        },
        {
            id: 3,
            icon: <Icons.FontAwesome6 name="users-gear" size={90} />,
            name: 'Таблица Администраторов'
        },
        {
            id: 4,
            icon: <Icons.MaterialCommunityIcons name="newspaper-variant-multiple" size={90} />,
            name: 'Таблица Новостей'
        },
        {
            id: 5,
            icon: <Icons.MaterialIcons name="category" size={90} />,
            name: 'Таблица Категорий'
        },
        {
            id: 6,
            icon: <Icons.FontAwesome name="heartbeat" size={90} />,
            name: 'Таблица Лайков'
        },
        {
            id: 7,
            icon: <Icons.FontAwesome name="comments-o" size={90} />,
            name: 'Таблица Комментариев'
        },
        {
            id: 8,
            icon: <Icons.FontAwesome name="comments-o" size={90} />,
            name: 'Таблица Оценок'
        }


    ])



    const [currentTime, setCurrentTime] = useState(new Date());

    const handleCardPress = () => { };

    const getData = async () => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            const usersQuery =
                'SELECT COUNT(*) as usersCount from Users where userLogin NOT LIKE "admin%"';
            const adminsQuery = 'SELECT COUNT(*) as adminsCount from Administrators';
            const postsQuery = 'SELECT COUNT(*) as postsCount from News';
            const likesQuery = 'SELECT postId, SUM(isLiked) as likesCount FROM Likes';
            const favoritesQuery =
                'SELECT COUNT(*) as favoritesCount from UserFavorites';
            const guestsQuery = 'SELECT COUNT(*) as guestsCount from Guests';
            const ratesQuery = 'SELECT id, AVG(rating) as ratesCount from Rates';
            const commentsQuery = 'SELECT COUNT(*) as commentsCount from Comments';

            const [
                usersResult,
                adminsResult,
                postsResult,
                likesResult,
                favoritesResult,
                guestsResult,
                ratesResult,
                commentsResult
            ] = await Promise.all([
                fetchData(usersQuery),
                fetchData(adminsQuery),
                fetchData(postsQuery),
                fetchData(likesQuery),
                fetchData(favoritesQuery),
                fetchData(guestsQuery),
                fetchData(ratesQuery),
                fetchData(commentsQuery)
            ]);

            const getCount = (result, key) =>
                result && result[key] ? result[key] : 0;

            const ratesCount = getCount(ratesResult, 'ratesCount');
            const formattedRatesCount = ratesCount
                ? parseFloat(ratesCount).toFixed(2)
                : 'N/A';

            const newData = [
                {
                    id: 1,
                    title: 'Пользователей',
                    count: getCount(usersResult, 'usersCount'),
                    icon: <Icons.Feather name="users" color="white" size={90} />,
                },
                {
                    id: 2,
                    title: 'Админов',
                    count: getCount(adminsResult, 'adminsCount'),
                    icon: <Icons.FontAwesome5 name="users-cog" color="white" size={90} />,
                },
                {
                    id: 3,
                    title: 'Постов',
                    count: getCount(postsResult, 'postsCount'),
                    icon: <Icons.FontAwesome6 name="newspaper" color="white" size={90} />,
                },
                {
                    id: 4,
                    title: 'Лайков',
                    count: getCount(likesResult, 'likesCount'),
                    icon: <Icons.FontAwesome name="heart-o" color="white" size={90} />,
                },
                {
                    id: 5,
                    title: 'Сохранённых новостей',
                    count: getCount(favoritesResult, 'favoritesCount'),
                    icon: <Icons.FontAwesome name="star-o" color="white" size={90} />,
                },
                {
                    id: 6,
                    title: 'Гостей',
                    count: getCount(guestsResult, 'guestsCount'),
                    icon: (
                        <Icons.FontAwesome5 name="user-secret" color="white" size={90} />
                    ),
                },
                {
                    id: 7,
                    title: 'Комментариев',
                    count: getCount(commentsResult, 'commentsCount'),
                    icon: (
                        <Icons.FontAwesome5 name="comments" color="white" size={90} />
                    ),
                },
            ];

            setData(newData);
            getAppData();
        } catch (err) {
            console.log(err);
        }
    };

    const getAppData = async () => {
        try {
            const ratesQuery = 'SELECT AVG(rating) as averageRating FROM Rates';
            const mostPopularCityQuery = `SELECT userCity, COUNT(userCity) as cityCount
            FROM Users
            GROUP BY userCity
            ORDER BY cityCount DESC, userCity DESC;
            `;
            const feedBacksQuery =
                'SELECT COUNT(*) as feedBacksCount FROM UsersFeedbacks';
            const likedMoviesQuery =
                'SELECT COUNT(*) as likedMoviesCount FROM likedMovies';
            const lastRegisteredUserQuery =
                'SELECT userLogin FROM Users ORDER BY userId DESC LIMIT 1';

            const ratesResult = await fetchData(ratesQuery);
            const cityResult = await fetchData(mostPopularCityQuery);
            const feedBacksResult = await fetchData(feedBacksQuery);
            const likedMoviesResult = await fetchData(likedMoviesQuery);
            const lastRegisteredUserResult = await fetchData(lastRegisteredUserQuery);

            const getAllUsersInfo = await fetchAllUsers();

            const averageRating =
                ratesResult && ratesResult.averageRating
                    ? parseFloat(ratesResult.averageRating).toFixed(2)
                    : 'N/A';

            const mostPopularCity = cityResult.userCity;
            const feedBacksCount = feedBacksResult.feedBacksCount;
            const likedMoviesCount = likedMoviesResult.likedMoviesCount;
            const lastRegisteredUser = lastRegisteredUserResult.userLogin;

            console.log('Number of users:', getAllUsersInfo.length);

            console.log('getAllUsersInfo', getAllUsersInfo);

            if (getAllUsersInfo && getAllUsersInfo.length > 0) {
                const users = getAllUsersInfo;
                setUsersData(users);

                for (const user of users) {
                    const userId = user.userId;
                    const userLogin = user.userLogin;
                    const userPassword = user.userPassword;
                    const userEmail = user.userEmail;
                    const userCity = user.userCity;
                }
            }

            const newAppData = [
                {
                    id: 1,
                    title: 'Cредний рейтинг',
                    count: averageRating,
                    icon: <Icons.FontAwesome name="star" color="white" size={75} />,
                    color1: '#40c9ff',
                    color2: '#e81cff',
                    description: `Средний рейтинг приложения на основе оценок пользователей в секции «Оцените нас» `,
                },
                {
                    id: 2,
                    title: 'Популярный город',
                    count: mostPopularCity,
                    icon: <Icons.FontAwesome name="building" color="white" size={75} />,
                    color1: '#ff1b6b',
                    color2: '#45caff',
                    description:
                        'Самый популярный город на основе выбора в секции прогноза погоды.',
                },
                {
                    id: 3,
                    title: 'Всего отзывов',
                    count: feedBacksCount,
                    icon: (
                        <Icons.MaterialCommunityIcons
                            name="message-reply-text"
                            color="white"
                            size={75}
                        />
                    ),
                    color1: '#696eff',
                    color2: '#f8acff',
                    description:
                        'Количество отзывов, отправленных пользователями в секции «Оставить отзыв»',
                },
                {
                    id: 4,
                    title: <Text style={{ fontSize: 22 }}>Избранных фильмов</Text>,
                    count: likedMoviesCount,
                    icon: (
                        <Icons.MaterialCommunityIcons
                            name="movie"
                            color="white"
                            size={75}
                        />
                    ),
                    color1: '#7ef29d',
                    color2: '#0f68a9',
                    description: 'Число фильмов, добавленных пользователями в избранное',
                },
                {
                    id: 5,
                    title: (
                        <Text style={{ fontSize: 18 }}>
                            Последний{'\n'}зарегестрировавшийся{'\n'}пользователь
                        </Text>
                    ),
                    count: (
                        <Text style={{ fontSize: 32, fontFamily: 'Inter-ExtraBold' }}>
                            {lastRegisteredUser}
                        </Text>
                    ),
                    icon: <Icons.FontAwesome5 name="user-plus" color="white" size={70} />,
                    color1: '#30c5d2',
                    color2: '#471069',
                    description:
                        'Последний пользователь, зарегестрировавшийся в приложении.',
                },
            ];

            setAppData(newAppData);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <StatusBar backgroundColor="#092439" />

            {isLoading ? (
                <>
                    <Image
                        blurRadius={30}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        source={require('../assets/images/search-bg.jpg')}
                    />
                    <Loader />
                </>
            ) : (
                <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
                    <Image
                        blurRadius={50}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        source={require('../assets/images/search-bg.jpg')}
                    />
                    <CustomDrawer
                        navigation={navigation}
                        backgroundColor="transparent"
                        showBorder
                        type="Подсистема">
                        <ScrollView
                            style={{ paddingVertical: 8 }}
                            showsVerticalScrollIndicator={false}>
                            <TypeWriter
                                style={{
                                    fontFamily: 'Inter-ExtraBold',
                                    fontSize: 32,
                                    textAlign: 'center',
                                    textShadowColor: 'rgba(226, 232, 240, 0.25)',
                                    textShadowOffset: { width: 0, height: 3 },
                                    textShadowRadius: 4,
                                }}
                                minDelay={0.2}
                                typing={1}
                                onTypingStart={() => setCanBeShowed(false)}
                                onTypingEnd={() => setCanBeShowed(true)}>
                                Добро пожаловать!
                            </TypeWriter>
                            <Text style={{ textAlign: 'center', fontFamily: 'Inter-Light' }}>
                                {formatDate(currentTime)}
                            </Text>

                            <InfoCarousel
                                data={data}
                                setActiveSlide={SetInfoCarouselActiveSlide}
                            />

                            <View style={{}}>
                                <CustomButton
                                    text="Скачать базу данных"
                                    type="Tertiary"
                                    onPress={downloadFile}
                                />
                            </View>

                            <View style={{ padding: 8 }}>
                                <Text style={{
                                    fontFamily: 'Inter-Black', fontSize: 32, textShadowColor: 'rgba(226, 232, 240, 0.25)',
                                    textShadowOffset: { width: 0, height: 3 },
                                    textShadowRadius: 4,
                                }}>
                                    Статистика
                                </Text>
                            </View>
                            <AppInfoCarousel
                                activeSlide={AppInfoCarouselActiveSlide}
                                data={appData}
                                setActiveSlide={SetAppInfoCarouselActiveSlide}
                            />

                            <View style={{ padding: 8 }}>
                                <Text style={{
                                    fontFamily: 'Inter-Black', fontSize: 32, textShadowColor: 'rgba(226, 232, 240, 0.25)',
                                    textShadowOffset: { width: 0, height: 3 },
                                    textShadowRadius: 4,
                                }}>
                                    Таблицы
                                </Text>
                            </View>

                            <TablesCarousel
                                navigation={navigation}
                                data={tablesData}
                                setActiveSlide={SetTablesCarouselActiveSlide}
                                usersData={usersData}
                            />

                            <AboutApp />
                            {/* {usersData.length > 0 && <UserTable table={usersData} />} */}
                        </ScrollView>
                    </CustomDrawer>
                </Animatable.View>
            )}
        </>
    );
}
