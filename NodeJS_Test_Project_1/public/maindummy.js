const blogForm = document.getElementById('myForm')
const blogTitle = document.getElementById('title')
const authorName = document.getElementById('author')
const blogContent = document.getElementById('content')
const blogsShow = document.getElementById('blogPlaceholder')


blogsShow.addEventListener('click', deleteComment)
blogsShow.addEventListener('click', deleteBlog)
blogForm.addEventListener('submit', addBlogToDb)
document.addEventListener('DOMContentLoaded', refresh)

function addBlogToDb(e){
    e.preventDefault()
    const data = {
        title: blogTitle.value,
        author: authorName.value,
        blog: blogContent.value
    }
    axios.post('/blogs/addBlog', data)
        .then(response => {
            const data = response.data
            const blogs = data.blogs
            blogTitle.value = ''
            authorName.value = ''
            blogContent.value = ''
            refresh()
        })
        .catch(err => console.log(err))
        
}

async function refresh(){
    try{
        let blogHtml = ''
        let id=1
        const response = await axios.get('/blogs/getAllBlogs')
        blogs = response.data.blogs
        comments = response.data.comments
        blogs.forEach(blog => {
            blogHtml+=`<div class="card">
            <div class="card-header bg-warning text-center d-flex justify-content-between">
                <div class="col-5 d-flex justify-content-start">
                    <h4>${blog.title}</h4>
                </div>
                <div class="lead col-3">
                     <strong>by <span class="fst-italic">${blog.author}</span></strong>
                </div>
                <div class="col-2">
                    <button class="btn btn-danger delete" id="${blog.id}">X</button>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#card${id}"
                    aria-expanded="true" aria-controls="group1">+</button>
                </div>
            </div>
            <div class="card-body collapse show " id="card${id}">
                <div class="text-center m-2">
                    <p style="text-align: justify;">${blog.content}</p>

                </div>
                <div class="comment-form">
                    <form action="/blogs/addComment/${blog.id}" method="POST">
                        <div class="input-group">
                            <input type="text" class="form-control" name="comment" placeholder="Write comment" id="comment" required>
                            <button type="submit" class="btn btn-success">&#10148;</button>
                        </div>               
                    </form>
                </div>`
                comments.forEach(comment => {
                    if(blog.id === comment.blogId){
                        blogHtml+=`<div class="mt-1">
                        <ul class="list-group" id="commentPlaceholder">
                            <li class="list-group-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <p style="text-align: justify;" class="pe-1">${comment.comment}</p>
                                </div>
                                    <button class="btn btn-danger btn-sm comment" id="${comment.id}">Delete</button>                                  
                            </li>
                        </ul>
                    </div>`
                    }
                })
            blogHtml+=`</div>
                </div>` 

        id+=1
        });
        blogsShow.innerHTML=blogHtml
    }catch(error){
        console.log(error)
    }
}

async function deleteComment(e){
    if(e.target.classList.contains('comment')){
        e.preventDefault()
        commentId = e.target.id
        await axios.delete(`/blogs/deleteComment/${commentId}`)
        e.target.parentElement.remove()
    }
}

async function deleteBlog(e){
    if(e.target.classList.contains('delete')){
        e.preventDefault()
        blogId = e.target.id
        await axios.delete(`/blogs/deleteBlog/${blogId}`)
        e.target.parentElement.parentElement.parentElement.remove()
    }
}