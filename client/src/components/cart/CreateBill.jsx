import {Form, Input, Modal, Select, Card, Button, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {clear} from '../../redux/cartSlice';
import { useNavigate } from "react-router-dom";

const CreateBill = ({isModalOpen, setIsModalOpen}) => {
  const {user} = useSelector((state) => state.user);
  const [form] = Form.useForm();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/server/bill/create`, {
        method:'post',
        body: JSON.stringify({
          ...values, 
          userId: user._id,
          subtotal: cart.total,
          items: cart.cartItems,
          amount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
        }),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      })

      if(response.status === 200){
        message.success('invoice added');
        form.resetFields();
        setIsModalOpen(false);
        dispatch(clear());
        navigate('/bills');
      }

      const data = await response.json();

    }catch(error){
        message.error('something error');
        console.log(error);
    }
  }

  return (
    <>
      <Modal 
        title="new order" 
        open={isModalOpen} 
        onCancel={() => {setIsModalOpen(false)}} 
        footer={false}>

        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item 
            name="customer" 
            label="user name" 
            rules={[{required:true, message: "username is required"}]}>
            <Input placeholder="username" maxLength={30} minLength={2}/>
          </Form.Item>

          <Form.Item 
            name="phone" 
            label="phone number" 
            rules={[{required:true, message: "phone is required"}]}>
            <Input placeholder="phone" maxLength={11} minLength={11}/>
          </Form.Item>

          <Form.Item 
            name="payment" 
            label="payment" 
            rules={[{required:true, message: "payment is required"}]}>
            <Select placeholder="Select a option">
              <Select.Option value="cash">cash</Select.Option>
              <Select.Option value="card">debit card</Select.Option>
            </Select>
          </Form.Item>

            <Card className="w-full">
              <div className="flex flex justify-between">
                <span>sub total</span>
                <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}$</span>
              </div>
              <div className="flex flex justify-between my-2">
                <span>TAX %B</span>
                <span className="text-red-600">
                  {
                    (cart.total * cart.tax) / 100 > 0 ? 
                    `+${((cart.total * cart.tax) / 100).toFixed(2)}` : 0
                  } 
                </span>
              </div>
              <div className="flex flex justify-between">
                <b>total</b>
                <b>{cart.total > 0 ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2) : 0}$</b>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={() => setIsModalOpen(true)} 
                  disabled={cart.cartItems.length === 0}
                  className="mt-4" 
                  type="primary" 
                  size="middle" 
                  htmlType="submit"
                >Order</Button>
              </div>
            </Card>

        </Form>

      </Modal>
    </>
  )
}

export default CreateBill;