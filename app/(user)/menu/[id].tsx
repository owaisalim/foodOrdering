import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import { Pressable } from 'react-native'
import Button from '@/components/button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/src/types'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/components/RemoteImage'
const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(Array.isArray(idString) ? idString[0] : idString) : null;

  // If id is null, handle this case separately
  if (id === null) {
    return <Text>Invalid product ID</Text>;
  }

  const { data: product, error, isLoading } = useProduct(id);

  const [SeletedSize, setSeletedSize] = useState<PizzaSize>('M');
  const { addItem } = useCart();
  const router = useRouter();

  const sizes: PizzaSize[] = ['S', 'M', 'L', "XL"];

  const AddToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, SeletedSize);
    router.push("/Cart");
  };

  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Failed to fetch the products</Text>
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage style={styles.image} resizeMode='contain'path={product?.image} fallback={defaultPizzaImage} />
      <Text>Select sizes</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => { setSeletedSize(size) }}
            style={[styles.size, { backgroundColor: SeletedSize === size ? 'gainsboro' : "white" }]}
            key={size}
          >
            <Text style={[styles.textsize, { color: SeletedSize === size ? 'black' : "" }]}>{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>Price: ${product?.price}</Text>
      <Button title={"Add To Cart"} handlePress={AddToCart} />
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: { 
    backgroundColor: "white",
    borderRadius: 20,
    flex: 10,
    padding: 10
  },
  image: {
    width: "100%",
    aspectRatio: 1
  },
  price: {
    paddingTop: 70,
    fontWeight: "bold",
    fontSize: 20,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  textsize: {
    fontSize: 20,
    fontWeight: "200"
  }
})
