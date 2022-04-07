import { Link } from "react-router-dom"
import { Player } from 'video-react';

const NewsCard = ({item}) => {
    const checkLengthComment = (item) => {
        let res = item
        if(item.split(' ').length > 78) {
            res = `${item.split(' ').splice(0, 78).join(' ')}...`
        }
        return res
    }

    const cleanDateTime = (item) => {
        return item
    }

    return(
        <Link className="news-card-container" to={`/article/${item.ref_id}`}>
        {/* <article className="news-card-container"> */}
            <div className="news-card-upvote-section"></div>
            <div className="news-card-content">
                <div className="news-card-header">
                    <h5 className="news-card-topic-field skeleton-header">s/{item.subpage_name}</h5>
                    <h5 className="news-card-topic-field skeleton-header">Posted by {item.author}</h5>
                    <h5 className="news-card-creation-date skeleton-header">{`Created at ${cleanDateTime(item.created_at)}`}</h5>

                </div>
                
                <h3 className="article-title">{item.title}</h3>
                {item.media_type === "image"? <img className="post_img" src={item.media_link}/>: <p>{checkLengthComment(item.body)}</p>}
                {item.media_type === "link"? 
                    (<div> 
                        <p>{item.media_link}</p>
                        {/* <img className="post_img" src={item.media_link}/> */}
                    </div>): null}
                {item.media_type === 'video'? <Player
                                width = "500"
                                height = "700"
                                fluid={false}
                                playsInline
                                // poster="/assets/poster.png"
                                src={item.media_link}
                                />: null}
                <div className="icons-section">
                    <h5>{item.num_comments} Comments</h5>
                    <h5>Reply</h5>
                    <h5>Save</h5>
                </div>
            </div>
        </Link>
    )
}

export default NewsCard