import { Modal, Form, Input, Button, message, Select } from 'antd';

const Add = ({ isAddModalOpen, setIsAddModalOpen, products, setProducts, category }) => {

  const [form] = Form.useForm();
  
  const onFinish = (data) => {
    try{
      fetch(`${process.env.REACT_APP_SERVER_URL}/server/product/create`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      })
      .then((response) => response.json())
      .then((newdata) => {
        
        message.success("product added");
        form.resetFields();

        setProducts([...products, {
          ...newdata.data, 
        }])

        setIsAddModalOpen(false);

      });

    }catch(error){
      console.log(error);
    }
  }

  return (
    <Modal 
      title="new product" 
        open={isAddModalOpen} 
        onCancel={() => {setIsAddModalOpen(false)}} 
        footer={false}>
    <Form layout='vertical' onFinish={onFinish} form={form}>
      <Form.Item name="title" label="title" 
        rules={[{required: true, message:'title is required'}]}>
        <Input placeholder='title'/>
      </Form.Item>

      <Form.Item name="image" label="image" 
        rules={[{required: true, message:'image is required'}]}>
        <Input placeholder='image'/>
      </Form.Item>

      <Form.Item name="price" label="price" 
        rules={[{required: true, message:'price is required'}]}>
        <Input placeholder='price'/>
      </Form.Item>

      <Form.Item name="category" label="category" 
        rules={[{required: true, message:'category is required'}]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
          }
          options={category}
      />
      </Form.Item>

      <Form.Item className="flex justify-end mb-0">
        <Button htmlType="submit" type="primary">add</Button>
      </Form.Item>
    </Form>
  </Modal>
  )
}

export default Add