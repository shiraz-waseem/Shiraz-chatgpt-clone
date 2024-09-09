import React from 'react'
import "./chatList.css"
import { Link } from "react-router-dom"
import { useQuery } from "react-query";


// const handleSubmit = async (e) => {
//   try {
//     console.log("Sending request with text:", text);
//     const response = await fetch("http://localhost:8000/api/userchats", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Success:', data);
//   } catch (error) {
//     console.error('Error during fetch:', error);
//   }
// }

const ChatList = () => {
  // first one is querykey through which we will fetch data other is queryfn
  const { isLoading, error, data } = useQuery('userChats', () =>
    fetch('http://localhost:8000/api/userchats', {
      credentials: "include",
    }).then((res) => res.json())
  )


  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Lama AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>

      <div className="list">
        {/* <Link to={`/dashboard/chats/`}>
          My List Item
        </Link> */}
        {isLoading
          ? "Loading..."
          : error
            ? "Something went wrong!" :
            data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))
        }

      </div>
      <hr />

      <div className="upgrade">
        <img src="/bot.png" alt="" />
        <div className="texts">
          <span>Upgrade to Lama AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>

    </div>


  )
}

export default ChatList
