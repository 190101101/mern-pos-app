import Header from '../components/header/Header';
import Edit from '../components/products/Edit';

const Products = () => {
  return (
    <>
      <Header/>
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center">Products</h1>
        <Edit/>
      </div>
    </>  
  )
}

export default Products