import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'

const FilterBar = () => {
    const [topicsData, setTopicsData] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('')

    useEffect(() => {
        console.log('hello')
        axios.get('https://nc-news-example-seminar-3-16.herokuapp.com/api/topics')
            .then(({data}) => {
                console.log(data)
                setTopicsData(data.topics)
                console.log(topicsData)
            })
    }, [])

    const handleSelectedTopic = (topic) => {
        setSelectedTopic(topic)
    }

    return(
        <main className="filter-wrapper">
                {topicsData.map((item) => {
                    return (
                        <Link to={`/topic/${item.slug}`}>
                            <h3 onClick={() => handleSelectedTopic(item.slug)}>{item.slug}</h3>
                        </Link>
                        )
                    }
                )}
        </main>
    )
}

export default FilterBar