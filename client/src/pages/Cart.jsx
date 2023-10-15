import { useState, useRef } from "react";
import { Table, Card, Button, Popconfirm, Input, Space } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Header from "../components/header/Header";
import CreateBill from "../components/cart/CreateBill";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, increment, decrement } from "../redux/cartSlice";
import Highlighter from "react-highlight-words";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      width: "125px",
      render: (text) => {
        return <img src={text} className="object-cover w-full h-20 " />;
      },
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      width: "125px",
      ...getColumnSearchProps("title"),
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      width: "125px",
      ...getColumnSearchProps("category"),
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      width: "125px",
      render: (text) => {
        return <span>{text.toFixed(2)}$</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "125px",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              className="w-full flex items-center justify-center !rounded-full"
              type="primary"
              size="small"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                dispatch(increment(record));
              }}
            />
            <span className="font-bold w-6 inline-bloc k text-center">
              {record.quantity}
            </span>
            <Button
              className="w-full flex items-center justify-center !rounded-full"
              type="primary"
              size="small"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity > 1) {
                  dispatch(decrement(record));
                }
                if (record.quantity === 1) {
                  if (window.confirm("i you sure?")) {
                    dispatch(decrement(record));
                  }
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "total",
      dataIndex: "total",
      key: "total",
      width: "125px",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}$</span>;
      },
    },
    {
      title: "Action",
      width: "125px",
      render: (_, record) => {
        return (
          <Popconfirm
            title="delete"
            okText="yep"
            cancelText="nope"
            onConfirm={() => {
              dispatch(deleteCart(record));
            }}
          >
            <Button type="link" danger>
              delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center">Cart</h1>
      <div className="px-6">
        <Table
          rowKey={"_id"}
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={true}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />

        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex flex justify-between">
              <span>sub total</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}$</span>
            </div>
            <div className="flex flex justify-between my-2">
              <span>TAX %B</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
              </span>
            </div>
            <div className="flex flex justify-between">
              <b>total</b>
              <b>
                {cart.total > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                $
              </b>
            </div>
            <Button
              onClick={showModal}
              className="mt-4 w-full"
              type="primary"
              size="large"
              disabled={cart.cartItems.length === 0}
            >
              Order
            </Button>
          </Card>
        </div>
      </div>

      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Cart;
