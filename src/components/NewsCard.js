import { Link } from "react-router-dom"

const NewsCard = ({item}) => {
    const checkLengthComment = (item) => {
        let res = item
        if(item.split(' ').length > 78) {
            res = `${item.split(' ').splice(0, 78).join(' ')}...`
        }
        return res
    }

    const cleanDateTime = (item) => {
        return item.split('T')[0]
    }

    return(
        <Link className="news-card-container" to={`/article/${item.article_id}`}>
        {/* <article className="news-card-container"> */}
            <div className="news-card-upvote-section"></div>
            <div className="news-card-content">
                <div className="news-card-header">
                    <h5 className="news-card-topic-field skeleton-header">Topic: {item.topic}</h5>
                    <h5 className="news-card-creation-date skeleton-header">{`Created at ${cleanDateTime(item.created_at)}`}</h5>
                </div>
                
                <h3 className="article-title">{item.title}</h3>
                <p>{checkLengthComment(item.body)}</p>
                <div className="icons-section">
                    <h5>Comments {item.comment_count}</h5>
                </div>
            </div>
        {/* </article> */}
        </Link>
    )
}

export default NewsCard