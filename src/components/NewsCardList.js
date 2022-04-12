import axios from "axios"
import { useEffect, useState } from "react"
import NewsCard from "./NewsCard"
import { Link, useLocation } from "react-router-dom";
import SkeletonNewsCard from "./SkeletonNewsCard";

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

const NewsCardList = ({topic, commentOrder, voteOrder}) => {
    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentTopic, setCurrentTopic] = useState(topic)
    let location = useLocation()
    // const skeleton = 
    console.log(currentTopic)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        console.log(window.location.search)
        const votes = 'top'
        // const paramValue = params.get("post");  
        // console.lo
        setCurrentTopic(topic)
        axios.get("https://reddit-flask-api.herokuapp.com/api/post/sample", {
            params: {
              topic: topic,
              votes: voteOrder,
              commentOrder: commentOrder,
            },
          }).then((res) => {
            console.log(res.data.post_sample.filter(item => item.media_type === 'image'))
            setNewsData(newsData =>res.data.post_sample)
            setIsLoading(false)
          });
    },[location])
    // console.log(newsData)

    if(isLoading) return (
        <section className="card-list-container">
            <div className="card-wrapper">
                {Array(4).fill(1).map((itemData) => {
                    return <SkeletonNewsCard/>
                })}
            </div>
        </section>
    )
    return(
        <section className="card-list-container">
            <div className="card-wrapper">
                {newsData.map((itemData) => {
                    // console.log(itemData)
                    return <NewsCard item={itemData}/>
                })}
            </div>
        </section>
    )
}










export default NewsCardList