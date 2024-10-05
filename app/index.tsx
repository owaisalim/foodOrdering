import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import CustomButton from '@/components/button';
import { Link, Redirect, router } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { supabase } from '@/src/lib/superbase';

const index = () => {
  const {session, loading,isAdmin} =  useAuth();
  if(loading){
    <ActivityIndicator/>
  }
if(!session){
 return <Redirect href={'/sign-in'} />
}


  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>

        <CustomButton title="User" handlePress={() =>router.push('/(user)')} />
     
      
        <CustomButton title="Admin" handlePress={() =>router.push('/(admin)')} />

        <CustomButton title="Sign out" handlePress={() =>supabase.auth.signOut()} />
     
    </View>
  );
};

export default index;