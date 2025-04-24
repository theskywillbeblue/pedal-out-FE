import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ParticipantsArray() {
    const { ride } = useLocalSearchParams();
    const parsedRide = JSON.parse(ride as string);
    const [participantImages, setParticipantImages] = useState([]);
    const router = useRouter();

    const participants = parsedRide.participants;
    
    useEffect(() => {
        async function getParticipantAvatars(participants) {
            try {
                const avatarPromises = participants.map(async (participant) => {
                    const {data, error} = await supabase
                    .from('user_profile')
                    .select('avatar_img')
                    .eq('username', participant)
                    .single();
    
                    if(error) {
                        console.error(`Error fetching avatar for participant ${participant}:`, error);
                        return null;
                    }
                    return data?.avatar_img || null;
                })
                const images = await Promise.all(avatarPromises)
                const removeDuplicates = images.filter(Boolean);
                setParticipantImages(removeDuplicates)
            } catch (err) {
            console.error('Failed to fetch participant avatars:', err);
        }}
        getParticipantAvatars(participants);
    }, [participants]); // change to participants when not hard coded


    function handleParticipantProfileClick(index) {
        const clickedProfileUsername = participants[index];
        router.push({pathname: 'FriendsProfile', params: {username: clickedProfileUsername}});
    }

    return (
        <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollOverlay}
                  contentContainerStyle={styles.avatarContainer}
                >
                  {participantImages.map((image, index) => {
                    return <View key={index} style={styles.avatarPlaceholder}>
                      <TouchableOpacity key={index} onPress={() => handleParticipantProfileClick(index)}>
                      <Image source={{ uri: image }} style={styles.avatarPlaceholder}/>
                      </TouchableOpacity>
                    </View>
                  })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  scrollOverlay: {
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 10,
  },
  avatarContainer: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    gap: 11, 
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 40,
  }
})