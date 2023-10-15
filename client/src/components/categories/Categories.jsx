import { useState, useEffect } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import Add from './Add';
import Edit from './Edit';
import { useSelector } from 'react-redux';

const Categories = ({category, setCategory, setFiltered, products}) => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('all');
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    if(categoryTitle === 'all'){
      setFiltered(products);
    }else{
      setFiltered(products.filter((item) => {
          return item.category === categoryTitle;
      }))
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    <>
      <ul className="flex md:flex-col gap-4 text-lg px-2">
          {category.map((item) => 
            <li key={item._id} onClick={() => {
              setCategoryTitle(item.title);
            }} className={`${item.title === categoryTitle && "bg-pink-700"} bg-green-700 px-6 py-10 text-white cursor-pointer hover:bg-pink-700 transition-all text-center min-w-[145px] flex justify-center items-center`}>
              <span>{item.title}</span>
            </li>
          )}

        {user.status === 'admin' &&
          <li className="bg-green-700 px-6 py-10 text-white cursor-pointer hover:bg-pink-700 transition-all text-center min-w-[145px] flex justify-center items-center !bg-purple-800 hover:opacity-90" onClick={() => {setIsAddModalOpen(true)}}>
            <PlusOutlined className="md:text-2xl"/>
          </li>
        }

        {user.status === 'admin' &&
          <li className="bg-green-700 px-6 py-10 text-white cursor-pointer hover:bg-pink-700 transition-all text-center min-w-[145px] flex justify-center items-center !bg-orange-800 hover:opacity-90" onClick={() => {setIsEditModalOpen(true)}}>
            <EditOutlined className="md:text-2xl"/>
          </li>
        }

          {user.status === 'admin' &&
            <Add 
              isAddModalOpen={isAddModalOpen} 
              setIsAddModalOpen={setIsAddModalOpen}
              category={category}
              setCategory={setCategory}
            />
          }

          {user.status === 'admin' &&
            <Edit
              isEditModalOpen={isEditModalOpen} 
              setIsEditModalOpen={setIsEditModalOpen}
              category={category}
              setCategory={setCategory}
            />
          }
      </ul>
    </>
  )
}

export default Categories;
