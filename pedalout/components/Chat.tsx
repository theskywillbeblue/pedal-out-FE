import React, { useEffect, useState } from 'react';
import Chat from '@codsod/react-native-chat';

type User = {
    _id: number;
    name: string;
  };
  
  type Message = {
    _id: number;
    text: string;
    createdAt: Date;
    user: User;
  };

const ChatComponent = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: 'Hey!',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'James',
				},
			},
			{
				_id: 2,
				text: 'Heyyyyyy James!',
				createdAt: new Date(),
				user: {
					_id: 1,
					name: 'Vishal Chaturvedi',
				},
			},
		]);
	}, []);

	const onSendMessage = (text) => {
		setMessages((prevMessages: any) => [
			{
				_id: prevMessages.length + 1,
				text,
				createdAt: new Date(),
				user: {
					_id: 1,
					name: 'Vishu Chaturvedi',
				},
			},
			...prevMessages,
		]);
	};

	return (

			<Chat
				messages={messages}
				setMessages={(val) => onSendMessage(val)}
				themeColor='#4F7942'
				themeTextColor='white'
				showSenderAvatar={false}
				showReceiverAvatar={true}
				inputBorderColor='#4F7942'
				user={{
					_id: 1,
					name: 'Vishal Chaturvedi',
				}}
				backgroundColor='white'
				inputBackgroundColor='white'
				placeholder='Enter Your Message'
				placeholderColor='gray'
				backgroundImage={
					'https://s1.at.atcdn.net/wp-content/uploads/2024/07/HERO-Northern-Rivers-Rail-Trail-2.jpg'
				}
				showEmoji={true}
				onPressEmoji={() => console.log('Emoji Button Pressed..')}
				showAttachment={true}
				onPressAttachment={() => console.log('Attachment Button Pressed..')}
				timeContainerColor='grey'
				timeContainerTextColor='black'
				// onEndReached={() => alert("You have reached the end of the page")}
			/>
	
	);
};


export default ChatComponent;