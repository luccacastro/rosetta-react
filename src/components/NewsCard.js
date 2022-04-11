import { Link } from "react-router-dom"
import { Player } from 'video-react';
import Votes from "./Votes";
import {stylizeText} from './utils/utils.js'


const NewsCard = ({item}) => {
    const trimBody = (item) => {
        let res = item
        if(item.split(' ').length > 78) {
            res = `${item.split(' ').splice(0, 78).join(' ')}...`
        }
        return stylizeText(res)
    }

    const cleanDateTime = (item) => {
        var format = {
            day: "numeric",
            month: "2-digit",
            year: "numeric"
          };
        let date = new Date(item).toLocaleString("en-gb", format)
        return date
    }

    const sanitizeVotes = (votes) => {
        return votes > 1000? `${(votes/1000).toFixed(2).slice(0,4)}k`: votes
    }

    return(
        <Link className="news-card-container" to={`/article/${item.ref_id}`}>
        {/* <article className="news-card-container"> */}
            <div className="news-card-upvote-section">
               <Votes contentType={"post"} votes={sanitizeVotes(item.votes)}/>
            </div>
            <div className="news-card-content">
                <div className="news-card-header">
                    <div className="topic-wrapper">
                        <div className="topic-prof-img"></div>
                        <h5 className="news-card-topic-field skeleton-header topic-name">s/{item.subpage_name}</h5>
                    </div> 
                    <h5 className="news-card-topic-field skeleton-header">Posted by {item.author}</h5>
                    <h5 className="news-card-creation-date skeleton-header">{`${cleanDateTime(item.created_at)}`}</h5>

                </div>
                
                <h3 className="article-title">{item.title}</h3>
                <h3 className="post-body" dangerouslySetInnerHTML={{__html: trimBody(item.body)}}></h3>

                {item.media_type === "image"? 
                    <div className="post-media-wrapper">
                        <img className="post-img" src={item.media_link}></img>
                    </div>: null}

                {item.media_type === "link"? 
                    (<div> 
                        <p>{item.media_link}</p>
                    </div>): null}

                {item.media_type === 'video'? 
                    <div className="post-media-wrapper video-fill-bg">
                        <video className="post-img " controls >
                            <source src={item.media_link} type="video/mp4"/>
                        </video>
                    </div>: null}
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