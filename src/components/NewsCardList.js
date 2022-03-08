import axios from "axios"
import { useEffect, useState } from "react"
import NewsCard from "./NewsCard"

const NewsCardList = () => {
    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get('https://nc-news-example-seminar-3-16.herokuapp.com/api/articles').then(res => {
            setNewsData(newsData => res.data.articles)
            console.log(newsData)
            setIsLoading(false)
        })
    },[])
    
    if(isLoading) return <p>Loading...</p>
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