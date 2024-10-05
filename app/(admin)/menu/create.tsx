import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/src/constants/Colors';
import CustomButton from '@/components/button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import * as ImagePicker from 'expo-image-picker';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useDeleteProduct, useProduct, userInsertProduct, useUpdateProduct } from '@/src/api/products';
import * as FileSystem from 'expo-file-system'
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/src/lib/superbase';
import { decode } from 'base64-arraybuffer';
const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();


  const isUpdating = !!id

  const { mutate: insertProduct } = userInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const {mutate:deleteProduct} = useDeleteProduct()
  

  const { data: updatingProduct } = useProduct(id);

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName('');
    setPrice('');
    setImage(null);
  };

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors("Name is required");
      return false;
    }

    if (!price) {
      setErrors("Price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a valid number");
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdateProduct();
    } else {
      onCreateProduct();
    }
  };

  const onCreateProduct = async() => {
    if (!validateInput()) {
      return;
    }
    const imagePath = await uploadImage()

    insertProduct({ name, price: parseFloat(price), image:imagePath }, {
      onSuccess: () => {
        resetFields();
        router.back();
      }
    });
  };


  const onUpdateProduct = async () => {
    if (!validateInput()) {
      return;
    }
    const imagePath = await uploadImage();

    updateProduct(
      { id, name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    deleteProduct(id,{
      onSuccess:() =>{
        resetFields();
        router.replace('/(admin)');
      }
    })
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: "Cancel",
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
  
    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? "Update Product" : "Create Product" }} />
      <Image style={styles.image} source={{ uri: image || defaultPizzaImage }} />
      <Text onPress={pickImage} style={styles.textbutton}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder='Name' />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType='numeric' placeholder='9.99' />
      <Text style={{ color: 'red' }}>{errors}</Text>
      <CustomButton title={isUpdating ? 'Update' : "Create"} handlePress={onSubmit} />
      {isUpdating && <Text onPress={confirmDelete} style={styles.textbutton}>Delete Product</Text>}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  label: {
    color: 'gray'
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: "center"
  },
  textbutton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10
  }
});