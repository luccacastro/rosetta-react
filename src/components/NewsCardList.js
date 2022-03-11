import axios from "axios"
import { useEffect, useState } from "react"
import NewsCard from "./NewsCard"
import { Link, useLocation } from "react-router-dom";
import SkeletonNewsCard from "./SkeletonNewsCard";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

const NewsCardList = ({topic}) => {
    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentTopic, setCurrentTopic] = useState(topic)
    let location = useLocation()
    // const skeleton = 
    console.log(currentTopic)
    useEffect(() => {
        setCurrentTopic(topic)
        axios.get("https://nc-news-example-seminar-3-16.herokuapp.com/api/articles", {
            params: {
              topic: topic,
            },
          }).then(({data}) => {
            setNewsData(newsData => data.articles)
            setIsLoading(false)
          });
    },[location])
    
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

                    return <NewsCard item={itemData}/>
                })}
            </div>
        </section>
    )
}








export default NewsCardList