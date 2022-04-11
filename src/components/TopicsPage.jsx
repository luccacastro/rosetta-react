import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FilterBar from "./FilterBar"
import NewsCardList from "./NewsCardList"


const TopicsPage = () => {
    const { topic } = useParams()
    console.log(topic)
    return(
        <div>
             <main className="main-container">
             <div className="news-container">
              
            
                <FilterBar/>
                <section className="card-list-container">
                    <div className="card-wrapper">
                        <NewsCardList topic={topic}/>
                    </div>
                </section>
                </div>
            </main>
            
        </div>
    )
}

export default TopicsPage