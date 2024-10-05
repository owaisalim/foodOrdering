import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter, Link } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import { Pressable } from 'react-native'
import Button from '@/components/button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch the product</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage style={styles.image} resizeMode='contain'path={product?.image} fallback={defaultPizzaImage} />

      <Text style={styles.textsize}>{product?.name}</Text>
      <Text style={styles.price}>{product?.price}</Text>
     
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textsize: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
