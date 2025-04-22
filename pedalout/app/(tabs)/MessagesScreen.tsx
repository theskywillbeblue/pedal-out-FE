import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import FloatingSearchBar from '../../components/search';
import ChatComponent from '@/components/Chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import { getAllChatsByUsername } from '@/api';
import { UserContext } from '../context/UserContext';
import { router } from 'expo-router';

export default function TabFourScreen() {
  // const { username } = useLocalSearchParams<{ username: string }>();
  const { profile } = useContext(UserContext);
  const loggedInUser = profile.username;

  // bring in username from usercontext, find chats and the other participants avatar_img, map through and create an avatar for each below
  // on click of one of these images, the user should be taken to the /chats/:chatId with GET request
  // set state to setOpenMessage to the first chatId and then on click, this is changed and invokes the component to change

  const [chatIds, setChatIds] = useState([]);
  const [chatPartners, setChatPartners] = useState([]);
  const [chatImages, setChatImages] = useState([]);
  const [openedMessage, setOpenMessage] = useState(chatIds[0]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    getAllChatsByUsername("jwilson_rider42795") //hardcoded right now
    .then((res) => {
      const myChatIds = res.map((chat) => {
        return chat[0];
      })
      setChatIds(myChatIds);
      const myChatPartners = res.map((chat) => {
        return chat[1];
      })
      setChatPartners(myChatPartners);
      getChatPartnerAvatars(chatPartners);
    })
    .catch((err) => {
      setError(err);
      throw err;
    })
    .finally(() => {
      setLoading(false);
    })
  }, [loggedInUser]);

  function getChatPartnerAvatars(chatPartners) {
    const avatars = chatPartners.map((chatPartner) => {
      return profile[chatPartner].avatar_img;
    })
    setChatImages(avatars);
  }

  function handleChatChange(index) {
    setOpenMessage(chatIds[index]);
  }

  if (isLoading) {
    return <Text>Fetching your messages...</Text>;
  }
  if (error) {
    return <Text>Houston, we have a problem!</Text>;
  }


	return (
	
			<SafeAreaProvider>
      <FloatingSearchBar />
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollOverlay}
          contentContainerStyle={styles.avatarContainer}
        >
          {chatImages.map((image, index) => {
            return <View style={styles.avatarPlaceholder}>
              <TouchableOpacity key={index} onPress={() => handleChatChange(index)}>
              <Image source={{ uri: image }} style={styles.avatarPlaceholder}/>
              </TouchableOpacity>
            </View>
          })}
        </ScrollView>
				<ChatComponent openedMessage={openedMessage}></ChatComponent>
			</SafeAreaProvider>
		
	);

}

const styles = StyleSheet.create({
  scrollOverlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 10,
  },
  avatarContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 16, 
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#ccc',
  }
})
