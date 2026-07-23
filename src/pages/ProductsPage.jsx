
// import Searchbar from './../components/Shop/Searchbar';
import ProductsCards from './../components/Shop/ProductsCards';
// import Sidebar from './../components/Shop/Sidebar';

function ProductsPage(){
    return (
        <div className="">
            {/* <div>
            <Searchbar/>
               
            </div> */}
         <div className="flex">
             {/* <Sidebar/> */}
            <ProductsCards/>
         </div>
            
        </div>
    );
}
export default ProductsPage;