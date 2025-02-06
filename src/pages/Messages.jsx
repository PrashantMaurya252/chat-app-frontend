import React, { useState } from "react";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message,setMessage] = useState("")
  const isOnline = false;
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "alice_j",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      status: "online",
      lastMessage: "Hey! How are you?",
      lastSeen: "2 minutes ago",
    },
    {
      id: 2,
      name: "Bob Williams",
      username: "bob_w",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      status: "offline",
      lastMessage: "See you tomorrow!",
      lastSeen: "1 hour ago",
    },
    {
      id: 3,
      name: "Charlie Brown",
      username: "charlie_b",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      status: "online",
      lastMessage: "Let's catch up later.",
      lastSeen: "Just now",
    },
    {
      id: 4,
      name: "David Smith",
      username: "david_s",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      status: "away",
      lastMessage: "Busy right now, talk later.",
      lastSeen: "30 minutes ago",
    },
    {
      id: 5,
      name: "Emily Davis",
      username: "emily_d",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      status: "online",
      lastMessage: "Did you see the new update?",
      lastSeen: "5 minutes ago",
    },
  ];

  
  return (
    <div className="w-full h-[90vh] px-5 flex ">
      <div className="w-[30%] p-5">
        <div className="flex flex-col gap-2">
          {users?.map((item, index) => (
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
                  <p>{item.lastMessage}</p>
                </div>
                <span className="text-sm">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-l-[2px] border-black h-full w-[70%] relative">
        {selectedUser ? (
          <div className="overflow-y-scroll">
            {selectedUser?.lastMessage}
            <div className="w-full flex justify-between items-center gap-2 absolute bottom-0 right-0">
              <input
                type="text"
                name="message"
                value={message}
                placeholder="Write your message here"
                onChange={(e) =>
                  setMessage(e.target.value.trimStart())
                }
                className="w-full px-2 py-1 border-[2px] rounded-md"
              />
              <button className="bg-blue-500 text-white px-2 py-1 font-semibold rounded-md cursor-pointer">Send</button>
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
