

export const getDate = (args) => {
    let local = new Date()
    local.setDate(local.getDate() - args)
    return local
}

export const isToDay = (date, localDate) => {
    if(localDate.getFullYear() === date.getFullYear() &&
    localDate.getMonth() === date.getMonth() && localDate.getDate() === date.getDate()){
        return true
    }
    else {
        return false
    }
}

export const fromDateToString = (date) => {
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
}

const generateKeywordsByName = (name) => {
    let keywords = []
    const letters = name.split('')
    letters.reduce((previous, current) => {
        previous += current
        keywords.push(previous)
        return previous
    }, '')

    return keywords
}

export const generateKeywordsByNames = (name) => {
    let keywords = []
    let words = name.split(' ')
    for(const word of words){
        let ret = generateKeywordsByName(word)
        keywords = keywords.concat(ret)
    }

    words.reduce((previous, current) => {
        if(previous !== ''){
            previous += ' ' + current
            let result = generateKeywordsByName(previous)
            keywords = keywords.concat(result)
            return previous  
        }
        return current
    }, '')

    return [...new Set(keywords)]
}

export const showFormat = (comment) => {
    let localDate;
    if(comment.local){
        localDate = comment.timestamp
    }
    else {
        localDate = comment.timestamp.toDate()
    }

    let toDay = new Date()

    if(toDay.getFullYear() !== localDate.getFullYear()){
        return toDay.getFullYear() - localDate.getFullYear() + ' Year(s) ago'
    }

    else if(toDay.getMonth() !== localDate.getMonth()){
        return toDay.getMonth() - localDate.getMonth() + ' Month(s) ago'
    }

    else if(toDay.getDate() !== localDate.getDate()){
        return toDay.getDate() - localDate.getDate() + ' Day(s) ago'
    }
    else if (toDay.getHours() !== localDate.getHours()){
        return toDay.getHours() - localDate.getHours() + 'h ago'
    }
    else if(toDay.getMinutes() !== localDate.getMinutes()){
        return toDay.getMinutes() - localDate.getMinutes() + ' min ago'
    }
    else {
        return 'now'
    }
}

export const getImageUrlOrString = (imageUrl, index) => {
        return (imageUrl && imageUrl[index] && imageUrl.localSrc) || ''
}

export const getMessage = (connected, date, localDate) => {
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    if(connected) {
        return 'Popular this Month'
    }
    else {
         if(isToDay(date, localDate)){
             return 'Today'
         }
         else{
             localDate.setDate(localDate.getDate() - 1)
             if(isToDay(date, localDate)) {
                 return 'Yesterday'
             }
             else {
                 let retDate = months[date.getMonth()] + ' ' + date.getDate()
                 if(date.getDate()%10 === 1){
                     return retDate + 'st'
                 }
                 else if(date.getDate()%10 === 2){
                     return retDate + 'nd'
                 }
                 else if(date.getDate()%10 === 3){
                     return retDate + 'rd'
                 }
                 else{
                     return retDate + 'th'
                 }
             }
         }
    }
 }

 export const PAGE_LENGTH = 3


 export const formatName = name => {
    let formatted = name.split(' ').map((word) => word.charAt(0).toUpperCase().concat(word.slice(1)))
    return formatted.join(' ')
 }


let myHeaders = new Headers();

export const fetchConfig = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
