import './NewsView.scss';
import {useContext, useEffect} from "react";
import AuthContext from "../AuthContext/AuthContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import NewsItem from "../News/NewsItem/NewsItem.jsx";
import NewsContext from "../NewsContext/NewsContext.jsx";
import Error404 from "../Error404/Error404.jsx";

export default function NewsView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { error, token,  profile } = useContext(AuthContext);
    const { errorNews, newsItem, newsItemHandler, handleNewsItem } = useContext(NewsContext);

    useEffect( () => {
        if (!token) {
            navigate('/');
        } else {
            try {
                const createRequest = async () => {
                    const newsItem = token && await handleNewsItem(token, id);
                    await newsItemHandler(newsItem);
                }
                createRequest().then();
            } catch (e) {
                console.log(e.message);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, profile]);


    if (!token) return;
    if (errorNews || error || !newsItem) return <Error404 />

    return (
        <div className="container__article">
            <Link to={'/news/'}>
                <NewsItem item={newsItem} />
            </Link>
        </div>
    )
}
