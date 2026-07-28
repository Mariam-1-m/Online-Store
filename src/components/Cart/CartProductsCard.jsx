import { Trash2 } from 'lucide-react';
import api from '../../lib/api';

function CartProdutsCard({ cartProducts, onUpdate }) {
    
    const updateitemQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const response = await api.patch(`/carts/items`, {
                productId: String(productId),
                quantity: Number(newQuantity)
            });
            window.dispatchEvent(new Event("cartUpdated"));
            console.log('Updated successfully', response.data);
            
           
            if (onUpdate) {
                onUpdate();
            }
        } catch (e) {
            console.log("API Error:", e.response?.data || e.message);
        }
    };


const deleteItem=async (itemId)=>{
    const confirm=window.confirm("Do you want to delete this item from the cart? ")
    if(confirm){
         try{
    
      const response=await api.delete(`/carts/items/${itemId}`);
      window.dispatchEvent(new Event("cartUpdated"));
     console.log('Item Deleted Successfully', response.data);
        if (onUpdate) {
                        onUpdate();
                    }
    }catch(e){
console.log(e.message);
         }
    }
   

}



    return (
        <div className="w-full h-auto p-5 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a] rounded-2xl flex flex-col gap-4">
            {cartProducts.map((item) => {
                return (
                    <div key={item.product} className="productCard items-center justify-between gap-5 p-5 w-full flex border-b border-slate-200 dark:border-[#23304a] last:border-b-0">
                        <div className="rounded-2xl overflow-hidden">
                            <img src={item.image || "/src/assets/hero.png"} alt={item.name} className="w-22 h-22 object-cover"/>
                        </div>
                        
                        <div className="flex justify-between items-center w-[90%] h-full">
                            <div className="flex flex-col gap-2 h-full">
                                <h3 className="font-bold text-sm">{item.name}</h3>
                                <p className="font-bold text-sm text-indigo-600">{item.price} EGP</p>
                                
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => updateitemQuantity(item.product, item.quantity - 1)} 
                                        className="flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700/90 p-2 size-8 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a] rounded-md cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <span className="flex justify-center items-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateitemQuantity(item.product, item.quantity + 1)} 
                                        className="flex items-center justify-center p-2 size-8 hover:bg-slate-100 dark:hover:bg-slate-700/90 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a] rounded-md cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col justify-between items-end h-full gap-4">
                                <button onClick={()=>deleteItem(item.product)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                                    <Trash2 size={18} />
                                </button>
                                
                                <p className="text-right font-semibold">EGP {item.price * item.quantity}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CartProdutsCard;