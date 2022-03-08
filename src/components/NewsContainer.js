import NewsCardList from "./NewsCardList"
import CreatePost from "./CreatePost"

const NewsContainer = () => {
    return(
       <div className="news-container">
           <div className="filter-wrapper">
            
            </div>
            <CreatePost/>
            <NewsCardList/>
        </div>
    )
}

export default NewsContainer