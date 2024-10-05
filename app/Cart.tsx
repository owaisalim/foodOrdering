import { View, Text,Platform,StyleSheet} from 'react-native'
import { FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { useCart } from '@/provider/CartProvider'
import CartListItem from '@/components/CartlistItem'
import CustomButton from '@/components/button'

const CartScreen = () => {
  const {items, total, checkout} = useCart()
  return (
    <View style = {{padding:10}} >
     <FlatList data={items} renderItem={({item}) =><CartListItem  cartItem={item} />} 
     contentContainerStyle ={{  gap:10}}
     />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
      <Text style = {{marginTop:20, fontSize:20, fontWeight:"500"}} >${total}</Text>
      <CustomButton title='Checkout' handlePress={checkout}/>
    </View>
  )
}

export default CartScreen
