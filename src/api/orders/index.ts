import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/src/lib/superbase";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables, InsertTables, UpdateTables } from "@/src/types";

export const useAdminOrderList = ({archived  = false}) =>{
    const statuses  = archived ? ['Delivered'] :['new', 'Cooking', 'Delivering']
    return  useQuery({
        queryKey:['orders',{archived} ],
        queryFn:async () =>{
          const {data, error} = await supabase.from('orders').select('*').in('status', statuses).order('created_at',{ascending:false})
          if(error){
            throw new Error(error.message)
          }
          return data;
        }
      })
      
     
        
}
export const useMyOrderList = () =>{
    const {session} = useAuth()
    const id = session?.user.id;
    return  useQuery({
        queryKey:['orders' , {userId:id}], 
        queryFn:async () =>{
        if (!id) return null    
          const {data, error} = await supabase.from('orders').select('*').eq('user_id',id).order('created_at',{ascending:false })
          if(error){
            throw new Error(error.message)
          }
          return data;
        }
      })
}

export const useOrderDetails= (id:number) =>{
  return  useQuery({
    queryKey:['orders', id],
    queryFn:async () =>{
      const {data, error} = await supabase.from('orders').select('*, order_items(*,products(*))').eq("id", id).single()
      if(error){
        throw new Error(error.message)
      }
      return data;
    }
  })
}

export const userInsertOrder = () =>{
  const queryClient = useQueryClient()
  const {session} = useAuth()
  const userId = session?.user.id;
      return useMutation({
        async mutationFn(data:InsertTables<'orders'>){
        const {error,data:newProduct}  =  await supabase.from("orders").insert({ user_id:userId, ...data}).select().single()

          if(error){
            throw new Error(error.message)
          }
          return newProduct;
        },
        async onSuccess(){
          // -------> type Error
        await queryClient.invalidateQueries({ queryKey: ['orders'] })
          //await queryClient.invalidateQueries( ['products'] );
        },
     
      })
 }
  
 export const useUpdateOrder = () =>{
  const queryClient = useQueryClient()
      return useMutation({
 async mutationFn({ id, updatedField}:{ id:number, updatedField: UpdateTables<'orders'>}){
 const {error,data:updatedOrder}  =  await supabase.from("orders").update(updatedField).eq('id' ,id).select().single()

          if(error){
            throw new Error(error.message)
          }
          return updatedOrder;
        },
        async onSuccess(_, {id}){
          // -------> type Error
          await queryClient.invalidateQueries({ queryKey: ['orders'] });
          //await queryClient.invalidateQueries( ['products'] );
          await queryClient.invalidateQueries( { queryKey: ['orders' , id] });
        }})
    }