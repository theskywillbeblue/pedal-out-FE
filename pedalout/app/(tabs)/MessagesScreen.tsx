import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import FloatingSearchBar from '../../components/search';
import ChatComponent from '@/components/Chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import { getAllChatsByUsername } from '@/api';
import { UserContext } from '../context/UserContext';
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams } from 'expo-router';

export default function TabFourScreen() {
  const { profile } = useContext(UserContext);
  const loggedInUser = profile.username;
  const [chatInfo, setChatInfo] = useState([]);
  const [chatIds, setChatIds] = useState([]);
  const [chatPartners, setChatPartners] = useState([]);
  const { chatId } = useLocalSearchParams();
  const [chatImages, setChatImages] = useState<string[]>([]);
  const [openedMessage, setOpenMessage] = useState(chatId || chatIds[0]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllChatsByUsername(loggedInUser)
    .then((res) => {
      const returnedChatInfo = res.chatInfo;
      setChatInfo(returnedChatInfo);
      const myChatIds = returnedChatInfo.map((chat) => {
        return chat[0];
      })
      setChatIds(myChatIds);
      setOpenMessage(myChatIds[0]);
      const myChatPartners = returnedChatInfo.map((chat) => {
        return chat[1];
      })
      setChatPartners(myChatPartners);
      getChatPartnerAvatars(myChatPartners);
    })
    .catch((err) => {
      setError(err);
      throw err;
    })
    .finally(() => {
      setLoading(false);
    })
  }, [loggedInUser]);

  async function getChatPartnerAvatars(chatPartners) {
    try {
      const avatarPromises = chatPartners.map(async (chatPartner) => {
        const { data, error } = await supabase
                  .from('user_profile')
                  .select('avatar_img')
                  .eq('username', chatPartner)
                  .single();
        
        if(error) {
          console.error(`Error fetching avatar for ${chatPartner}:`, error.message);
          return null;
        }
          
        return data?.avatar_img || null;
      });
        const avatars = await Promise.all(avatarPromises);
        const filteredAvatars = avatars.filter(Boolean);
        setChatImages(filteredAvatars);
    } catch (err) {
      console.error('Failed to fetch chat partner avatars:', err);
    }
}

  function handleChatChange(index: number) {
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
            return <View key={index} style={styles.avatarPlaceholder}>
              <TouchableOpacity key={index} onPress={() => handleChatChange(index)}>
              <Image source={{ uri: image }} style={styles.avatarPlaceholder}/>
              </TouchableOpacity>
            </View>
          })}
        </ScrollView>
        {openedMessage && chatInfo.length > 0 && (
          <ChatComponent 
            openedMessage={openedMessage} 
            user={loggedInUser} 
            chatPartner={chatInfo.find(([chat]) => chat === openedMessage)?.[1] || ''}
          />
        )}
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
