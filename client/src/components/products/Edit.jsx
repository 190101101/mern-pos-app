import {Form, Input, Modal,Table, Button, message, Select} from 'antd';
import { useState, useEffect } from 'react';

const Edit = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [editingItem, setEditingItem] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/server/product/all`)
        const data = await response.json();
        setProducts(data);

      }catch(error){
        console.log(error);
      }
    }

    getProducts();
  }, []);
  
  useEffect(() => {
    const getCategory = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/server/category/all`)
        const data = await response.json();
        data && setCategory(data.map((item) => {
          return {...item, value: item.title};
        }));

      }catch(error){
        console.log(error);
      }
    }

    getCategory();
  }, []);

  const onFinish = (data) => {
    try{
      fetch(`${process.env.REACT_APP_SERVER_URL}/server/product/update`,{
        method: 'PUT',
        body: JSON.stringify({...data, id: editingItem._id}),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      });

      message.success("products updated");

      setProducts(products.map((item) => {
        if(item._id === editingItem._id){
          return data;
        }
        return item;
      }))

    }catch(error){
      console.log(error);
    }
  }

  const deleteProduct = (id) => {
    if(window.confirm('i you sure?')){
      try{
        fetch(`${process.env.REACT_APP_SERVER_URL}/server/product/delete`, {
          method:'delete',
          body: JSON.stringify({id}),
          headers: {"Content-Type":"application/json; charset=UTF-8"}
        })
        message.success("product deleted");
        setProducts(products.filter((item) => item._id !== id))

      }catch(error){
        console.log(error);
      }
    }
  }

  const columns = [
      {
        title:'name',
        dataIndex:'name',
        width:"2%",
        render:(_, record) => {
            return <p>{record.title}</p>
        }
      },
      {
        title:'image',
        dataIndex:'image',
        width:"2%",
        render:(_, record) => {
          return <img src={record.image} className='w-full h-20 object-cover'/>
      }
      },
      {
        title:'price',
        dataIndex:'price',
        width:"2%",
      },
      {
        title:'category',
        dataIndex:'category',
        width:"2%",
      },
      {
        title: 'Action',
        dataIndex: 'action',
        width:"2%",
        render: (_, record) => {
          return (
            <div>
              <Button 
                type="link" 
                onClick={() => {
                  setIsEditModalOpen(true)
                  setEditingItem(record)
                  form.setFieldsValue(record);
                  
                }} 
                className='pl-0'>update</Button>
              
              <Button 
                type="link" 
                htmlType="submit" 
                className='text-gray-500'>save</Button>
              
              <Button 
                type="link" 
                onClick={() => { deleteProduct(record._id) }} 
                danger>delete</Button>
            </div>
          )
        }
      },
    ]

  return (
    <>
      <Table 
        rowKey={"_id"} 
        bordered 
        dataSource={products} 
        columns={columns} 
        scroll={{ x: 1000, y: 300 }}
      /> 

      <Modal 
        title="new product" 
          open={isEditModalOpen} 
          onCancel={() => {setIsEditModalOpen(false)}} 
          footer={false}>
      <Form layout='vertical' onFinish={onFinish} form={form} initialValues={editingItem}>
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
          <Button htmlType="submit" type="primary">Edit</Button>
        </Form.Item>
      </Form>
    </Modal>
    </>
  )
}

export default Edit