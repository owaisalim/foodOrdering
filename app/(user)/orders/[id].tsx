import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { useOrderDetails } from '@/src/api/orders';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions';

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(Array.isArray(idString) ? idString[0] : idString) : null;
  if (id === null) {
    return <Text>Invalid product ID</Text>;
  }
const {data:order, error, isLoading} = useOrderDetails(id)
    useUpdateOrderSubscription(id)
 

  if(isLoading){
    return <ActivityIndicator/>
  }

  if(error){
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