import React from 'react'
import "./dashboardPage.css"
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const mutation = useMutation({
    mutationFn: async (text) => {
      return await fetch("http://localhost:8000/api/chats", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
      }).then((res) => res.json())

      // if its success it returns chatId. (Backend sy bhej rhy)
    }, onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });   // after adding data we fetch it. ChatList mein we did it while fetching chat list so now ab jaisay you will add a chat braber mein bhi ajaya ga
      navigate(`/dashboard/chats/${id}`);

    },
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;    // no text inside input dont do anything


    mutation.mutate(text);

    // try {
    //   console.log("Sending request with text:", text);
    //   const response = await fetch("http://localhost:8000/api/chats", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ text })
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   console.log('Success:', data);
    // } catch (error) {
    //   console.error('Error during fetch:', error);
    // }
  }
  return (
    <div className="dashboardPage" >
      <div className="texts">
        <div className="logo">
          <img src="/bot.png" alt="" />
          <h1>SHIRAZ AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>

      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>

    </div >
  )
}

export default DashboardPage
