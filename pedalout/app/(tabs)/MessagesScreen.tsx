import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import FloatingSearchBar from '../../components/ChatSearch';
import ChatComponent from '@/components/Chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import { getAllChatsByUsername } from '@/api';
import { UserContext } from '../context/UserContext';
import { supabase } from '@/lib/supabase';

export default function TabFourScreen() {
  const { profile } = useContext(UserContext);
  const loggedInUser = profile?.username || '';
  const [chatInfo, setChatInfo] = useState([]);
  const [chatIds, setChatIds] = useState([]);
  const [chatPartners, setChatPartners] = useState([]);
  const [chatImages, setChatImages] = useState<string[]>([]);
  const [openedMessage, setOpenMessage] = useState(chatIds[0]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllChatsByUsername(loggedInUser)
      .then((res) => {
        const returnedChatInfo = res.chatInfo;
        setChatInfo(returnedChatInfo);
        const myChatIds = returnedChatInfo.map((chat) => {
          return chat[0];
        });
        setChatIds(myChatIds);
        setOpenMessage(myChatIds[0]);
        const myChatPartners = returnedChatInfo.map((chat) => {
          return chat[1];
        });
        setChatPartners(myChatPartners);
        getChatPartnerAvatars(myChatPartners);
      })
      .catch((err) => {
        setError(err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loggedInUser]);

  async function getChatPartnerAvatars(chatPartners) {
    try {
      const avatarPromises = chatPartners.map(async (chatPartner) => {
        const { data, error } = await supabase
          .from('user_profile')
          .select('avatar_img')
          .eq('username', chatPartner)
          .single();

        if (error) {
          console.error(
            `Error fetching avatar for ${chatPartner}:`,
            error.message,
          );
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
        return (
          <View style={styles.loaderContainer}>
          <Image
            source={require('../../assets/images/FetchingMessagesWhite.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        );
  }
  if (error) {
    return <Text>Houston, we have a problem!</Text>;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/ProfileBackgroundWhite.png')}
      style={[styles.background, { flex: 1 }]}
      imageStyle={{ opacity: 0.4 }}
    >
      <SafeAreaProvider>
        <FloatingSearchBar />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollOverlay}
          contentContainerStyle={styles.avatarContainer}
        >
          {chatImages.map((image, index) => {
            return (
              <View key={index} style={styles.avatarPlaceholder}>
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChatChange(index)}
                  style={styles.avatarWrapper}
                >
                  <View style={styles.avatarOverlay}>
                    <Image source={{ uri: image }} style={styles.avatarImage} />
                    <Text style={styles.avatarName}>{chatPartners[index]}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        {openedMessage && chatInfo.length > 0 && (
          <ChatComponent
            openedMessage={openedMessage}
            user={loggedInUser}
            chatPartner={
              chatInfo.find(([chat]) => chat === openedMessage)?.[1] || ''
            }
          />
        )}
      </SafeAreaProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 10,
    height: 110,
  },
  avatarContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: 'row',
    gap: 16,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },

  avatarWrapper: {
    width: 70,
    height: 70,
    marginTop: 5,
  },
  avatarOverlay: {
    position: 'relative',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  avatarName: {
    position: 'absolute',
    top: 27,
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 2,
    color: 'white',
    fontSize: 9,
    width: '100%',
    paddingHorizontal: 6,
    borderRadius: 0,
    overflow: 'hidden',
    maxWidth: 70,
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    // marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  background: {
    flex: 1,
  },
  image: {
    maxWidth: Platform.OS === 'ios' ? 300 : 300,
    width: '50%',
    aspectRatio: 1,
    maxHeight: 400,
    marginBottom: 30,
    alignSelf: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
