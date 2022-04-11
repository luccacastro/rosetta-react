import axios from "axios"
import { useEffect, useState } from "react"
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

const FilterBar = ({setCommentOrder, setVoteOrder}) => {
    const [topicsData, setTopicsData] = useState([])
    const [currentTopic, setCurrentTopic] = useState('top')
    // const [selecte, setSelectedTopic] = useState('')
    const navigate = useNavigate();

    const optionsList = [{label:"Top"},{label:"Lowest"}]

    useEffect(() => {
        console.log('hello')
        axios.get('http://localhost:5502/api/subpage/')
            .then(({data}) => {

                const labels = data.sublist.map(x =>{ return {label: x.title}})
                // console.log(data)
                setTopicsData(topicsData => labels)
                
            })
    }, [])
    console.log(currentTopic)

    const handleSelectedTopic = (topic) => {
        console.log(topic)
        // setCurrentTopic(topic.label)
        navigate(`/topic/${topic.label}`)
    }

    const handleVotesOrder = (orderType) => {
        setVoteOrder(orderType)
    }

    const handleCommentsOrder = (orderType) =>{
        setCommentOrder(orderType)
    }

    return(
        <main className="filter-wrapper">
            <h3>Subpage </h3>
            {topicsData.length?  <Select className="select-component" options={topicsData} onChange={handleSelectedTopic} value={currentTopic} />: null}
            <h3>Votes </h3>
            <Select className="" options={optionsList} onChange={handleVotesOrder} value='Top'/>
            <h3>Comments </h3>
            <Select className="" options={optionsList} onChange={handleCommentsOrder} name='dsdas'/>
        </main>
    )
}

export default FilterBar