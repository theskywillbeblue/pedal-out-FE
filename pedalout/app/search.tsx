import { StyleSheet, View, TextInput } from 'react-native';


export default function FloatingSearchBar() {
 
     return (
       <View style={styles.floatingSearchContainer} >
         <TextInput
         
           placeholder="📌 Search ... " //we can add template literals here to tell users what the search will do on dif. tabs
           placeholderTextColor="#888"
           style={styles.searchInput}
         />
       </View>
     );
   }
   
   const styles = StyleSheet.create({
     floatingSearchContainer: {
      fontFamily: 'HelveticaRounded',
      position: 'absolute',
       top: 35,
       left: 20,
       right: 20,
       zIndex: 1000,
       backgroundColor: 'white',
       borderRadius: 12,
       paddingHorizontal: 2,
       paddingVertical: 2,
       shadowColor: '#FFFFFF',
       shadowRadius: 5,
       elevation: 5,
     },
     searchInput: {
      fontFamily: 'HelveticaRoundedBold',
      textAlign: 'left',
      
       fontSize: 16,
       paddingLeft: 12,
     },
      headerImage: {
     color: '#808080',
     bottom: -90,
     left: -35,
     position: 'absolute',
   },
   titleContainer: {
     flexDirection: 'row',
     gap: 8,
     fontFamily: 'HelveticaRoundedBold',
    },
   });