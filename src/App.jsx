import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider/AuthProvider';
import Header from './components/Header/Header';
import News from './components/News/News';
import NewsView from "./components/NewsView/NewsView";
import NewsProvider from "./components/NewsProvider/NewsProvider.jsx";
import Error404 from "./components/Error404/Error404.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="app">
                    <NewsProvider>
                        <Routes>
                            <Route path="/" element={<News />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/news/:id" element={<NewsView />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </NewsProvider>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App;