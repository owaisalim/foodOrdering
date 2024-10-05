import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import Colors from '@/src/constants/Colors';
import { OrderStatusList } from '@/src/types';
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders';
const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(Array.isArray(idString) ? idString[0] : idString) : null;
  if (id === null) {
    return <Text>Invalid product ID</Text>;
  }
const {data:order, error, isLoading} = useOrderDetails(id)
const {mutate:updateOrder} = useUpdateOrder()

 const updateStatus =(status:String) =>{
updateOrder({id:id, updatedField:{status}})
 }

  if(isLoading){
    return <ActivityIndicator/>
  }

  if(error || !order){
    return <Text>Failed to fetch</Text>
  }


  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order}/>}
        ListFooterComponent={() =>(
          <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <TouchableOpacity
        key={status}
        onPress={() => updateStatus(status)}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</>
 
        )}
    
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;