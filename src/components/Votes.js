// import VoteIcon from '../arrow.svg'
import { useEffect, useState } from 'react';
import InlineSVG from 'svg-inline-react';
import { useToasts } from 'react-toast-notifications'

// import ColoredVoteIcon from '../colored_vote_icon.png'
import axios from 'axios';

const Votes = ({contentType, votes, ref_id}) => {
    const [voteState, setVoteState] = useState({upvoted: false, downvoted: true})
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownvoted, setIsDownvoted] = useState(false)
    const [lastVote, setLastVote] = useState('upvote')
    const [currentVotes, setCurrentVotes] = useState(votes)
    // const { addToast } = useToasts()

    useEffect(() => {

    }, [])

    const handleClick = (voteType) =>{
        // setVoteState(currState => {return {...currState, [increase]: !currState[increase] }})
        let increaseAmount = 0
        if(voteType === "upvoted") {
            
            setIsUpvoted(currState => !currState)
            setLastVote('')
            increaseAmount = 1
        }
        if(voteType === "downvoted"){
             increaseAmount = -1
            //  setVoteState(currState => {return {...currState, [voteType]: !currState[voteType] }})
             setIsDownvoted(currState => !currState)
        }
        if(voteType === lastVote){
            setCurrentVotes(votes)
            setLastVote('')
        }else{
            setCurrentVotes(votes + increaseAmount)
            setLastVote(voteType)
        }
        axios.post('http://localhost:5502/api/voting/', {
                contentType: contentType,
                ref_id: ref_id,
                increaseScore: !voteState[voteType]
            }).then((res) =>{
                // console.log(res.data.votes)
                setVoteState(currState => {return {...currState, [voteType]: !currState[voteType] }})
            }).catch(function (error) {
                setIsUpvoted(false)
                // console.log(error.response.data)
                setCurrentVotes(votes)
                
            });
    }

    const arrow = `<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"/></svg>`
    return(
        <div className={contentType == "post"? "votes-wrapper-post": "votes-wrapper-comment"}>
            
            <InlineSVG className='upvote' onClick={() => handleClick("upvoted")} src={arrow} style={{fill: isUpvoted? 'orange' : null}} />
            {/* <img src={VoteIcon} alt="" /> */}
            <h3 className='vote-amount'>{currentVotes? currentVotes: votes}</h3>
            <InlineSVG className='downvote' onClick={() => handleClick("downvoted")}  style={{transform: 'rotate(180deg)', fill: isDownvoted? 'blue' : null, marginBottom: '5px'}}  src={arrow} />
            {/* <img src={VoteIcon} style={{transform: 'rotate(180deg)'}} alt=""/> */}
        </div>
    )
}

export default Votes