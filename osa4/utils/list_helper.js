const dummy = (blogs) => {
    
    return 1
  }
const totalLikes = (blogs) => {
  
    
    const likearray = blogs.map((likes, i) => blogs[i].likes)
    const total = (sum, item) => {
        return sum + item
    }
    return likearray.reduce(total)
}

const favoriteBlog = (blogs) => {

    
    const likearray = blogs.map((likes, i) => blogs[i].likes)
    const array = blogs.map((likes, i) => blogs[i].likes)
    likearray.sort((a, b) => b - a)
    let mostlikes = likearray[0]
    const ind = array.indexOf(mostlikes)
    const lempi = blogs[ind]
    resp = {
        title: lempi.title,
        author: lempi.author,
        likes: lempi.likes
    }
    
    return resp
}

const mostBlogs = (blogs) => {
    const authorarray = blogs.map((likes, i) => blogs[i].author)
    authorarray.sort()
    let pituus = authorarray.length
    let longest = 0
    let name = authorarray[0]
    for(i = 0; i < pituus; i++){
        
        let test = authorarray[i]
        let filtered = authorarray.filter(name => name === test)
        if(filtered.length > longest){
            longest = filtered.length
            name = test
            
        }
        
    }
    res =  {
        author: name,
        blogs: longest
    }
    return res
}

const mostLikes = (blogs) => {
    const authorarray = blogs.map((likes, i) => blogs[i].author)
    const unsorted = blogs.map((likes, i) => blogs[i].author)
    const likearray = blogs.map((likes, i) => blogs[i].likes)
    authorarray.sort()
    console.log(unsorted)
    console.log(authorarray)
    let pituus = authorarray.length
    let most = 0
    let name = authorarray[0]
    const allIndexOf = (array, val) => {
        let indexes = []
        let i = -1
        while ((i = array.indexOf(val, i+1)) != -1){
            indexes.push(i)
        }
        return indexes
    }
    for(i = 0; i < pituus; i++){
        
        let test = authorarray[i]
        
        let testnum = 0
        let filtered = authorarray.filter(name => name === test)

        let indexes = allIndexOf(unsorted, test)
        console.log(indexes)
        for(i = 0; i < indexes.length; i++){
            testnum =+ likearray[indexes[i]]
            console.log(testnum)
        }
        if(testnum > most){
            most = testnum 
            name = test
            
        }
        
    }
    res =  {
        author: name,
        blogs: most
    }
    return res
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }