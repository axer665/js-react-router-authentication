/* eslint-disable react/prop-types */
import {useState} from 'react';
import NewsContext from "../NewsContext/NewsContext.jsx";

export default function NewsProvider(props) {
    const [errorNews, setError] = useState(null);
    const [news, setNews] = useState(null);
    const [newsItem, setNewsItem] = useState(null);

    const newsHandler = (value) => setNews(value)
    const newsItemHandler = (value) => setNewsItem(value)
    const errorHandler = (value) => setError(value);

    const handleNewsList = async (token) => {
        const newsResponse = await fetch(process.env.REACT_APP_NEWS_URL, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!newsResponse.ok) {
            throw new Error('Ошибка запроса получения списка новостей');
        }
        return await newsResponse.json();
    }

    const handleNewsItem = async (token, id) => {
        const newsResponse = await fetch(process.env.REACT_APP_NEWS_URL+`/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!newsResponse.ok) {
            throw new Error('Ошибка запроса получения новости');
        }
        return await newsResponse.json();
    }

    return (
        <NewsContext.Provider value={{
            handleNewsList,
            handleNewsItem,
            news,
            newsHandler,
            newsItem,
            newsItemHandler,
            errorNews,
            errorHandler
        }}>
            {props.children}
        </NewsContext.Provider>
    )
}