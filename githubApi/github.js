require("dotenv").config();

const TOKEN_KEY=process.env.ACCESS_TOKEN;






const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");


searchBtn.addEventListener("click", searchUser)
searchInput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter") searchUser()
})

async function searchUser(){
    const username = searchInput.value.trim();
    if (!username) return alert("Please enter a username")

    try {
        //reset the ui
        profileContainer.classList.add("hidden")
        errorContainer.classList.add("hidden")
        //https://api.github.com/users/Teddy-1001


        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }) 
        if(!response.ok) throw new Error("User not found")

        const UserData = await response.json()
        console.log("User data is here", UserData);

        displayUserData(UserData)

    } 
    catch (error) { 
       showError() 
    }
}

function displayUserData(user) {
    avatar.src = user.avatar_url;
    nameElement.textContent=user.name || user.login;
    usernameElement.textContent= `@${user.login}`
    bioElement.textContent=user.bio || "Bio not available"
    locationElement.textContent=user.location || "Not specified"

    //todo: format date
    joinedDateElement.textContent=user.created_at

    profileLink.href=user.html_url;
    followers.textContent=user.followers;
    following.textContent=user.following;
    repos.textContent=user.public_repos

    if (user.company) companyElement.textContent=user.company;
    else companyElement.textContent="Not specified"


    if (user.blog) {
        blogElement.textContent=user.blog;
        blogElement.href=user.blog.startsWith("http") ? user.blog : `https://${user.blog}`;
    } else {
        blogElement.textContent="No website"
        blogElement.href="#"
    }
    blogContainer.style.display="flex";

    
    
    if (user.twitter_username) {
        twitterElement.textContent=`@${user.twitter_username}`;
        twitterElement.href=`https://twitter.com/${user.twitter_username}`;
    } else {
        twitterElement.textContent="No twitter"
        twitterElement.href="#"
    }
    twitterContainer.style.display="flex";
    //show profile
    profileContainer.classList.remove("hidden");


}






function showError(){
    errorContainer.classList.remove("hidden")
    profileContainer.classList.add("hidden")
}

searchInput.value="Teddy-1001";
searchUser();