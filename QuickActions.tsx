import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type QuickActionsProps = {
  onCalmMe: () => void;
  onQuestion: () => void;
  onSave: () => void;
};

export default function QuickActions({
  onCalmMe,
  onQuestion,
  onSave,
}: QuickActionsProps) {
  return (
    <View style={styles.container}>
      <ActionButton
        icon="weather-windy"
        label="Calm me"
        onPress={onCalmMe}
      />

      <ActionButton
        icon="comment-question"
        label="Question"
        onPress={onQuestion}
      />

      <ActionButton
        icon="content-save"
        label="Save"
        onPress={onSave}
      />
    </View>
  );
}

type ActionButtonProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

function ActionButton({
  icon,
  label,
  onPress,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={20}
        color="#E75480"
      />

      <Text style={styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF9F3',
    gap: 8,
  },

  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 3,
  },

  buttonText: {
    color: '#4B1D7A',
    fontWeight: '900',
    fontSize: 12,
  },
});