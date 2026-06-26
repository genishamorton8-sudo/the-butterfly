import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PrayerScreen() {
  const [saved, setSaved] = useState(false);
  const [prayer, setPrayer] = useState('');

  return (
    <View style={styles.screen}>
      <Text style={styles.icon}>🙏</Text>

      <Text style={styles.title}>Prayer Time</Text>

      <Text style={styles.subtitle}>
        God is listening.
      </Text>

      <View style={styles.card}>

        <Text style={styles.scripture}>
          "Casting all your care upon him; for he careth for you."
        </Text>

        <Text style={styles.reference}>
          1 Peter 5:7 KJV
        </Text>

        <Text style={styles.prompt}>
          Write your prayer.
        </Text>

        <TextInput
          multiline
          value={prayer}
          onChangeText={(text)=>{
            setPrayer(text);
            setSaved(false);
          }}
          placeholder="Dear Lord..."
          placeholderTextColor="#999"
          style={styles.input}
        />

        {saved && (
          <Text style={styles.saved}>
            Prayer Saved ❤️
          </Text>
        )}

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={()=>setSaved(true)}
      >
        <Text style={styles.buttonText}>
          Save Prayer
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
screen:{
flex:1,
backgroundColor:"#FFF9F3",
padding:25,
paddingTop:70
},

icon:{
fontSize:60,
textAlign:"center",
marginBottom:10
},

title:{
fontSize:34,
fontWeight:"800",
textAlign:"center",
color:"#4B1D7A"
},

subtitle:{
fontSize:18,
textAlign:"center",
color:"#E75480",
marginBottom:25
},

card:{
backgroundColor:"#fff",
padding:22,
borderRadius:25
},

scripture:{
fontStyle:"italic",
textAlign:"center",
fontSize:17,
color:"#4B1D7A"
},

reference:{
textAlign:"center",
fontWeight:"700",
marginTop:10,
marginBottom:20,
color:"#D4AF37"
},

prompt:{
fontSize:18,
fontWeight:"700",
marginBottom:10,
color:"#4B1D7A"
},

input:{
height:220,
backgroundColor:"#F4E7F8",
borderRadius:18,
padding:15,
fontSize:17,
textAlignVertical:"top"
},

saved:{
marginTop:20,
textAlign:"center",
fontWeight:"800",
color:"#2E8B57",
fontSize:17
},

button:{
backgroundColor:"#E75480",
marginTop:25,
padding:18,
borderRadius:30
},

buttonText:{
color:"#fff",
fontWeight:"800",
fontSize:18,
textAlign:"center"
}

});