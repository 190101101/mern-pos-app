import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart/CartTotals";
import { Spin } from "antd";

const Home = () => {
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/server/category/all`
        );
        let data = await response.json();
        data &&
          setCategory(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/server/product/all`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Header />
      {products.length > 0 && category.length > 0 ? (
        <div className="home px-6 flex md:flex-row justify-between gap-10 flex-col mb:pb-0 pb-24 ">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              category={category}
              setCategory={setCategory}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] pb-10 min-h[500px]">
            <Products
              category={category}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
            />
          </div>
          <div className="cart-wrapper lg:max-w-[300px] min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-0 h-screen w-screen flex justify-center items-center"
        />
      )}
      }
    </>
  );
};

export default Home;
