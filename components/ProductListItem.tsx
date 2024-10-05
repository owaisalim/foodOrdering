import Colors from '@/src/constants/Colors';
import { Pressable, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import products from '@/assets/data/products';
import { Text, View, Image} from 'react-native'
import { Product } from '@/src/types';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/src/database.types';
import RemoteImage from './RemoteImage';
export const defaultPizzaImage
 = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

 type ProductListItemProps ={
  product: Tables<'products'>
 }

const ProductListItem = ({product} :ProductListItemProps)=>{
  const segments = useSegments()
    return (
    
  <Link href={`${segments[0]}/menu/${product.id}`} asChild >
    <Pressable style  = {styles.container} >
      
      <RemoteImage  style = {styles.image} resizeMode='contain' 
      path={product.image}
      fallback={defaultPizzaImage}
      />
     <Text style = {styles.title} >{product.name}</Text>
     <Text style = {styles.price} >${product.price}</Text>
  
   </Pressable> 
   </Link>
  );
}

 export default ProductListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    padding:10,
    borderRadius:20,
    flex:1,
    maxWidth:"50%"
    
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical:10,
    

  },
  price: {
    color:Colors.light.tint,
    fontWeight:"bold",

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image:{
    marginTop:10,
    width:"100%",
    aspectRatio:1
  }
});
