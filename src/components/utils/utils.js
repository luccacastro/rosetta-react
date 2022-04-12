import parse from 'html-react-parser';

const stylizeText = (comment) => {
    
   
    if(comment){
        // comment = comment.split(' ').map(word => word.replace(/&amp;#39;/g, "'")).join(" ")
        comment = comment.replace(/&amp;#39;/g, "'");
        comment = comment.replace(/&amp;quot;/g, '"');
        comment = comment.replace(/&lt;/g,'<');
        comment = comment.replace(/&gt;/g,'>');
        
        // console.log(parse(comment))
        const getLinks = comment.match(/\[(.*?)\]+\((.*)\)/g)
        if(getLinks){
            getLinks.forEach(element => {
                let text = element.match(/\[(.*?)\]/g)
                let url = element.match(/\((.*)\)/g)
                url = url[0].slice(1, url.length-2)
                text = text[0].slice(1, text.length-2)
                const aTag = `<a href=${url}>${text}</a>`
                comment = comment.replace(element, aTag)
            });
            // console.log(comment)
        }  
    }
    // console.log(comment)
    return comment
}

const renderPostMedia = (mediaType, url) => {
    const postImage = <img className="post-img" src={url}></img>
    const postVideo =  <video className="post-img " controls >
                        <source src={url} type="video/mp4"/>
                    </video>
    return mediaType === "video"? postVideo : postImage
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

export {stylizeText, renderPostMedia, cleanDateTime, sanitizeVotes}