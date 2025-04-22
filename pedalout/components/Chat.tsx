import React, { useEffect, useState } from 'react';
import Chat from '@codsod/react-native-chat';
import { getMessagesByChatId } from '@/api';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';

// get all messages (setMessages) and show them in reverse order
// post new message

  interface Message {
	_id?: string;
	chatId: string;
	participants: string[];
	sentBy: string;
	message: string;
	sentAt: string;
  }

  interface ChatComponentProps {
	openedMessage: string;
	user: string;
	chatPartner: string;
  }

  const ChatComponent: React.FC<ChatComponentProps> = ({ openedMessage, user, chatPartner }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getMessagesByChatId(openedMessage)
		.then((res) => {
			setMessages(res);
		})
		.catch((err) => {
			setError(err);
			throw err;
		})
		.finally(() => {
			setLoading(false);
		})
	}, [openedMessage]);

	if (isLoading) {
		return <Text>Fetching chat...</Text>;
	  }
	  if (error) {
		return <Text>Houston, we have a problem!</Text>;
	  }

	  const onSendMessage = (text: string) => {
		const messageToSend = {
		  chatId: openedMessage,
		  participants: [user, chatPartner],
		  sentBy: user,
		  message: text,
		  sentAt: new Date().toISOString(),
		};

		const messageRequest = {
			message: text,
			chatPartner: chatPartner,
			username: user
		}
	  
		postMessage(openedMessage, messageRequest)
		  .then((res) => {
			const newMessageWithId: Message = {
			  _id: res.insertedId,
			  ...messageToSend
			};
			setMessages((prevMessages) => [newMessageWithId, ...prevMessages]);
		  })
		  .catch((err) => {
			setError(err);
			throw err;
		  });
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
				user={user}
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
			/>
	);
};

// type User = {
//     _id: number;
//     name: string;
//   };
  
//   type Message = {
//     _id: number;
//     text: string;
//     createdAt: Date;
//     user: User;
//   };

// const ChatComponent = (openedMessage) => {
// 	const [messages, setMessages] = useState<Message[]>([]);

// 	useEffect(() => {
// 		setMessages([
// 			{
// 				_id: 1,
// 				text: 'Hey!',
// 				createdAt: new Date(),
// 				user: {
// 					_id: 2,
// 					name: 'James',
// 				},
// 			},
// 			{
// 				_id: 2,
// 				text: 'Heyyyyyy James!',
// 				createdAt: new Date(),
// 				user: {
// 					_id: 1,
// 					name: 'Vishal Chaturvedi',
// 				},
// 			},
// 		]);
// 	}, []);

// 	const onSendMessage = (text) => {
// 		setMessages((prevMessages: any) => [
// 			{
// 				_id: prevMessages.length + 1,
// 				text,
// 				createdAt: new Date(),
// 				user: {
// 					_id: 1,
// 					name: 'Vishu Chaturvedi',
// 				},
// 			},
// 			...prevMessages,
// 		]);
// 	};

// 	return (

// 			<Chat
// 				messages={messages}
// 				setMessages={(val) => onSendMessage(val)}
// 				themeColor='#4F7942'
// 				themeTextColor='white'
// 				showSenderAvatar={false}
// 				showReceiverAvatar={true}
// 				inputBorderColor='#4F7942'
// 				user={{
// 					_id: 1,
// 					name: 'Vishal Chaturvedi',
// 				}}
// 				backgroundColor='white'
// 				inputBackgroundColor='white'
// 				placeholder='Enter Your Message'
// 				placeholderColor='gray'
// 				backgroundImage={
// 					'https://s1.at.atcdn.net/wp-content/uploads/2024/07/HERO-Northern-Rivers-Rail-Trail-2.jpg'
// 				}
// 				showEmoji={true}
// 				onPressEmoji={() => console.log('Emoji Button Pressed..')}
// 				showAttachment={true}
// 				onPressAttachment={() => console.log('Attachment Button Pressed..')}
// 				timeContainerColor='grey'
// 				timeContainerTextColor='black'
// 			/>
// 	);
// };


export default ChatComponent;