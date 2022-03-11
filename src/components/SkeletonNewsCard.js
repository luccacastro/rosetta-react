import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonNewsCard = () => {
    return(
        <article className="news-card-container">
            <div className="news-card-upvote-section"></div>
            <div className="news-card-content">
                <div className="news-card-header">
                    <h5 className="news-card-topic-field skeleton-topic">Topic: item.topic</h5>
                    <h5 className="news-card-creation-date skeleton-creation-date">Created at 2000-00-00</h5>
                </div>
                
                <h3><Skeleton count={5} /></h3>
                <p><Skeleton count={2} /></p>
                <div className="icons-section">
                    <h5><Skeleton count={2} /></h5>
                </div>
            </div>
        </article>
    )
}

export default SkeletonNewsCard

