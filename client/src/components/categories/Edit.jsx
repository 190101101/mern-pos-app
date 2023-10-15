import {Form, Input, Modal,Table, Button, message} from 'antd';
import { useState } from 'react';

const Edit = ({ isEditModalOpen, setIsEditModalOpen, category, setCategory }) => {

  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState({}) 

  const onFinish = (data) => {
    try{
      fetch(`${process.env.REACT_APP_SERVER_URL}/server/category/update`,{
        method: 'PUT',
        body: JSON.stringify({...data, id: editingRow._id}),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      });

      message.success("category updated");

      setCategory(category.map((item) => {
        if(item._id === editingRow._id){
          return {...item, title: data.title}
        }
        return item;
      }))

    }catch(error){
      console.log(error);
    }
  }

  const deleteCategory = (id) => {
    if(window.confirm('i you sure?')){
      try{
        fetch(`${process.env.REACT_APP_SERVER_URL}/server/category/delete`, {
          method:'delete',
          body: JSON.stringify({id}),
          headers: {"Content-Type":"application/json; charset=UTF-8"}
        })
        message.success("category deleted");
        setCategory(category.filter((item) => item._id !== id))

      }catch(error){
        error.success("category deleted");
      }
    }
  }

  const columns = [
      {
        title:'category title',
        dataIndex:'title',
        render:(_, record) => {
          if(record._id === editingRow._id){
            return (
              <Form.Item className='mb-0' name="title">
                <Input defaultValue={record.title}/>
              </Form.Item>  
            );
          }else{
            return <p>{record.title}</p>
          }
        }
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (_, record) => {
          return (
            <div>
              <Button type="link" onClick={() => {
                setEditingRow(record)
                form.setFieldsValue({ title: record.title });
              }} className='pl-0'>update</Button>
              <Button type="link" htmlType="submit" className='text-gray-500'>save</Button>
              <Button type="link" onClick={() => { deleteCategory(record._id) }} danger>delete</Button>
            </div>
          )
        }
      },
    ]

  return (
    <Modal 
      open={isEditModalOpen} 
      onCancel={() => {setIsEditModalOpen(false)}} 
      footer={false}
      title="category"
      >
        <Form onFinish={onFinish} form={form}>
            <Table rowKey={"_id"} bordered dataSource={category} columns={columns}/> 
        </Form>
    </Modal>
  )
}

export default Edit