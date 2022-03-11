import NewsCardList from "./NewsCardList"
import CreatePost from "./CreatePost"
import FilterBar from "./FilterBar"
import {useState, createContext, useContext} from 'react'

// const NewsDataTopicContext = createContext();

const NewsContainer = () => {
    // const [newsDataTopic, setNewsData] = useState(null);
    
    return(
       <div className="news-container">
                <FilterBar></FilterBar>
                <CreatePost/>
                <NewsCardList topic={null}/>
        </div>
    )
}

export default NewsContainer