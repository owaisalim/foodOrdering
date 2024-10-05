import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/src/lib/superbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "@/src/types";
export const userInsertOrderItems = () =>{
    const queryClient = useQueryClient()

        return useMutation({
          async mutationFn(items:InsertTables<'order_items'>[]){
          const {error,data:newProduct}  =  await supabase.from("order_items").insert(items).select()
  
            if(error){
              throw new Error(error.message)
            }
            return newProduct;
          },
         
       
        })
   }
    