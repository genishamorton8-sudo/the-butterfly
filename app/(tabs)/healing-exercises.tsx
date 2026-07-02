import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ChangeTheThoughtScreen() {
  const [situation, setSituation] = useState('');
  const [thought, setThought] = useState('');
  const [truth, setTruth] = useState('');

  function continueJourney() {
    Alert.alert(
      'Beautiful.',
      'You just took one Butterfly step. More guidance and journaling will be added here.'
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.icon}>🧠</Text>

      <Text style={styles.title}>Change the Thought</Text>

      <Text style={styles.subtitle}>
        Sometimes our first thought isn't our truest thought.
        Let's walk through it together.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          What happened?
        </Text>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Tell me what happened..."
          value={situation}
          onChangeText={setSituation}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          What thought hurt the most?
        </Text>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Write the thought here..."
          value={thought}
          onChangeText={setThought}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          What would God lovingly remind you?
        </Text>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Write a healthier truth..."
          value={truth}
          onChangeText={setTruth}
        />
      </View>

      <View style={styles.scriptureCard}>
        <Text style={styles.scriptureTitle}>
          Truth for Today
        </Text>

        <Text style={styles.scripture}>
          "Be transformed by the renewing of your mind."
        </Text>

        <Text style={styles.reference}>
          Romans 12:2
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={continueJourney}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.back}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          Back
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:'#FFF9F3'
  },

  content:{
    padding:24,
    paddingTop:70,
    paddingBottom:120
  },

  icon:{
    fontSize:56,
    textAlign:'center'
  },

  title:{
    fontSize:32,
    fontWeight:'900',
    color:'#4B1D7A',
    textAlign:'center',
    marginTop:10
  },

  subtitle:{
    textAlign:'center',
    fontSize:16,
    color:'#555',
    marginVertical:20,
    lineHeight:24
  },

  card:{
    backgroundColor:'#FFF',
    borderRadius:20,
    padding:18,
    marginBottom:18,
    borderWidth:2,
    borderColor:'#F1D7A7'
  },

  label:{
    fontSize:17,
    fontWeight:'700',
    color:'#4B1D7A',
    marginBottom:10
  },

  input:{
    minHeight:120,
    textAlignVertical:'top',
    borderWidth:1,
    borderColor:'#DDD',
    borderRadius:12,
    padding:12,
    fontSize:16,
    backgroundColor:'#FFF'
  },

  scriptureCard:{
    backgroundColor:'#FFFFFF',
    borderRadius:20,
    padding:20,
    borderWidth:2,
    borderColor:'#D4AF37',
    marginBottom:20
  },

  scriptureTitle:{
    fontSize:18,
    fontWeight:'900',
    color:'#4B1D7A',
    marginBottom:10
  },

  scripture:{
    fontSize:18,
    fontStyle:'italic',
    lineHeight:28,
    color:'#333'
  },

  reference:{
    marginTop:10,
    fontWeight:'700',
    color:'#4B1D7A'
  },

  button:{
    backgroundColor:'#E75480',
    padding:18,
    borderRadius:30,
    alignItems:'center'
  },

  buttonText:{
    color:'#FFF',
    fontSize:18,
    fontWeight:'900'
  },

  back:{
    marginTop:16,
    alignItems:'center'
  },

  backText:{
    color:'#4B1D7A',
    fontWeight:'700'
  }
});