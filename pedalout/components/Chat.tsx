import React, { useEffect, useState } from 'react';
import Chat from '@codsod/react-native-chat';
import { getMessagesByChatId, postNewMessage } from '@/api';
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native';
import { Platform } from 'react-native';

  interface ChatComponentProps {
	openedMessage: string;
	user: string;
	chatPartner: string;
  }

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

  const ChatComponent: React.FC<ChatComponentProps> = ({ openedMessage, user, chatPartner }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getMessagesByChatId(openedMessage)
		.then((res) => {
			const formattedMessages = res.map((message, index) => ({
				_id: index,
				text: message.message,
				createdAt: new Date(message.sentAt),
				user: {
					_id: message.sentBy === user ? 1 : 2,
					name: message.sentBy,
				}
			}));
			const sortedMessages = formattedMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
			setMessages(sortedMessages);
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

		const messageRequest = {
			message: text,
			chatPartner: chatPartner,
			username: user
		}
	  
		postNewMessage(openedMessage, messageRequest)
		  .then(() => {
			const newFormattedMessage: Message = {
			  _id: messages.length + 1,
			  text: text,
			  createdAt: new Date(),
			  user: {
				_id: 1,
				name: user,
			  },
			};
			setMessages((prevMessages: any) => [newFormattedMessage, ...prevMessages]);
			console.log(messages);
		  })
		  .catch((err) => {
			setError(err);
			throw err;
		  });
	  };

	return (
		<KeyboardAvoidingView style={styles.keyboard}
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		keyboardVerticalOffset={Platform.OS === 'ios' ? 45 : 0}>
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
					name: user
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
			/>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
  keyboard: {
	flex: 1
  }
});

export default ChatComponent;
