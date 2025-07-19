import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive scaling factors
const scale = width / 375; // 375 is iPhone 11 width
const verticalScale = height / 812; // 812 is iPhone 11 height

export const responsiveFontSize = (size) => Math.round(size * scale);
export const responsivePadding = (padding) => Math.round(padding * scale);

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsivePadding(20),
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: responsivePadding(15),
    fontSize: responsiveFontSize(20),
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: responsivePadding(10),
  },
  button: {
    backgroundColor: '#007AFF',
    padding: responsivePadding(15),
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: responsivePadding(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(20),
  },
  card: {
    backgroundColor: '#fff',
    padding: responsivePadding(15),
    borderRadius: 12,
    marginVertical: responsivePadding(10),
    elevation: 2,
  },
});
