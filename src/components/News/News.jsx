import './News.scss';
import { useContext, useEffect } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import NewsContext from "../NewsContext/NewsContext.jsx";
import NewsItem from './NewsItem/NewsItem';
import {Link, useNavigate} from "react-router-dom";

export default function News() {
  const { error, token, profile } = useContext(AuthContext);
  const { news, errorNews, newsHandler, handleNewsList } = useContext(NewsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      const createRequest = async () => {
        try {
          const newsList = await handleNewsList(token);
          await newsHandler(newsList);
        } catch (e) {
          console.log(e.message);
        }
      }
      createRequest().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, token]);

  if (error || errorNews || !news) return;

  if (news && token) return (
    <main className="app__body body container">
      {news.map((el) => <Link key={el.id} to={`/news/${el.id}`}><NewsItem key={el.id} item={el} /></Link>)}
    </main>
  )
}