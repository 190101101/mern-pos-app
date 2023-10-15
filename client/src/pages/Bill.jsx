import { useState, useEffect, useRef } from "react";
import { Table, Button, Popconfirm, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Header from "../components/header/Header";
import PrintBill from "../components/bills/PrintBill";
import { useSelector } from "react-redux";

const Bill = () => {
  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [customer, setcustomer] = useState();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  useEffect(() => {
    const getBills = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/server/bill/${
            user.status == "admin" ? "all" : "user/" + user.username
          }`
          );
          
        const data = await response.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
      ...getColumnSearchProps("customer"),
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: "payment",
      dataIndex: "payment",
      key: "payment",
      ...getColumnSearchProps("payment"),
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => {
        return <span>{text}$</span>;
      },
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsModalOpen(true);
                setcustomer(record);
              }}
            >
              print
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center">Bills</h1>
      <div className="px-6">
        <Table
          rowKey={"_id"}
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={true}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
      </div>
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};

export default Bill;
