import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({item}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({...item, quantity:1}));
  }

  return (
    <>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none overflow-hidden" onClick={handleClick}>
        <div className="product-img">
          <img className="h-28 object-cover w-full border-b" src={item.image}/>
        </div>

        <div className='product-info flex flex-col p-3'>
          <span className="font-bold">{item.title}</span>
          <span>{item.price} $</span>
        </div>
      </div>
    </>
  )
}

export default ProductItem