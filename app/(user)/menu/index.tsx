import products from '@/assets/data/products';
import { Text, View, Image,ScrollView, FlatList, ActivityIndicator} from 'react-native'
import ProductListItem from '@/components/ProductListItem';
import { useProductList } from '@/src/api/products';
export default function MenuScreen() {

const {data:products, error, isLoading} = useProductList()

if(isLoading){
  return <ActivityIndicator/>
}
if(error){
  return <Text>Failed to fetch the products</Text>
}

  
  return(
  <FlatList data={products} 
  renderItem={({item}) => <ProductListItem product={item}/>}
  numColumns={2}
  contentContainerStyle ={{gap:10, padding:10}}
  columnWrapperStyle ={{gap:10}}
  />
  )
}

 