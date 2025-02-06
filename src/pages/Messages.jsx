import  { useContext, useEffect, useState } from "react";
import { mainContext } from "../context/GlobalContext";

import { url } from "../data/config";
import { socket } from "../socket";

const Messages = () => {
  const { user } = useContext(mainContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${url}/user/all-users`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setAllUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const conversation = async () => {
    try {
      const response = await fetch(`${url}/messages/all/${selectedUser._id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      if (data.success) {
        setConversations(data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    if (selectedUser) {
      conversation();
    }
    socket.on("newMessage", (newMessage) => {
      
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        setConversations((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("newMessage")
    };
  }, [selectedUser]);

  // useEffect(()=>{
  //   if(selectedUser){
  //     conversation()
  //   }
  // },[selectedUser])

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`${url}/messages/send/${selectedUser._id}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Could not send message");
      }

      const data = await response.json();
      if (data.success) {
        setConversations((prev)=>[...prev,data.newMessage])
        setMessage("")
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(typeof  JSON.parse(localStorage.getItem("user"))._id,"user")

  return (
    <div className="w-full h-[90vh] px-5 flex ">
      <div className="w-[30%] p-5">
        <div className="flex flex-col gap-2">
          {allUsers?.map((item, index) => (
            <div
              key={index}
              className="flex justify-start items-center gap-2 cursor-pointer border-b pb-3"
              onClick={() => setSelectedUser(item)}
            >
              <img
                alt="avatar"
                className="w-[50px] h-[50px] rounded-full bg-blue-500"
              />
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-2 ">
                  <h1 className="text-lg font-semibold">{item.name}</h1>
                  <p>{item.role}</p>
                </div>
                <span
                  className={`text-sm ${
                    onlineUsers.includes(item._id)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {onlineUsers.includes(item._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-l-[2px] border-black h-full w-[70%] relative">
        {selectedUser ? (
          <div className="overflow-y-scroll w-full h-full">
            <h1 className="w-full text-xl font-semibold  p-4 border-b-[3px]">
              {selectedUser.name}
            </h1>
            {/* {selectedUser?.lastMessage} */}
            {conversations.length === 0 ? (
              <span className="flex flex-col w-full h-full justify-center items-center">
                No Message To Show
              </span>
            ) : (
              <div className={` w-full flex flex-col`}>
                {conversations?.map((item, index) => (
                  <p key={index} className={`w-full ${item.senderId === user._id ? "text-start text-blue-500":"text-end text-green-500"}`}>{item.message}</p>
                ))}
              </div>
            )}
            <div className="w-full flex justify-between items-center gap-2 absolute bottom-0 right-0">
              <input
                type="text"
                name="message"
                value={message}
                placeholder="Write your message here"
                onChange={(e) => setMessage(e.target.value.trimStart())}
                className="w-full px-2 py-1 border-[2px] rounded-md"
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 font-semibold rounded-md cursor-pointer"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <span className="w-full h-full flex justify-center items-center font-bold text-xl">
            Select a user to show chat
          </span>
        )}
      </div>
    </div>
  );
};

export default Messages;
