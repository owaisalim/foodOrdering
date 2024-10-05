import { supabase } from '@/src/lib/superbase';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';


const LogoutScreen = ({ onLogout, onCancel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🚪</Text>
        </View>
        
        {/* Text */}
        <Text style={styles.textTitle}> You're leaving...</Text>
        <Text style={styles.textSubtitle}>Are you sure want to logout?</Text>
        
        {/* Buttons */}
     
        <TouchableOpacity style={styles.buttonSecondary}  onPress={async () => await supabase.auth.signOut()}>
          <Text style={styles.buttonSecondaryText}>Yes, Log Me Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  box: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 50,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#4DA5FE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonSecondary: {
    borderColor: '#4DA5FE',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#4DA5FE',
    fontSize: 16,
  },
});

export default LogoutScreen;
