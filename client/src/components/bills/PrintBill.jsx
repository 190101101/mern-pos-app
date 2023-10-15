import {useRef} from 'react';
import {Modal, Button} from 'antd';
import {useReactToPrint} from 'react-to-print';

const PrintBill = ({isModalOpen, setIsModalOpen, customer}) => {

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  
  return (
    <>
      <Modal 
        title="Print Bill" 
        open={isModalOpen} 
        onCancel={() => {setIsModalOpen(false)}} 
        footer={false}
        width={800}>

        <section className="py-20 bg-black" ref={componentRef}>
          <div className='max-w-5xl mx-auto bg-white px-6'>
            <article className='overflow-hidden'>
              <div className='logo my-6'>
                <h2 className='text-4xl font-bold text-slate-700'>LOGO</h2>
              </div>
              <div className="bill-details">
                <div className='grid sm:grid-cols-4 grid-cols-3 gap-12'>
                  
                  <div className='text-md text-slate-500'>
                    <p className='font-bold text-slate-700'>Bill Details:</p>
                    <p>{customer?.customer}</p>
                    <p>paper Street 101</p>
                    <p>San Javiev</p>
                    <p>CA 1234</p>
                  </div>

                  {/*  */}
                  <div className='text-md text-slate-500'>
                    <p className='font-bold text-slate-700'>Bill</p>
                    <p>The Boring Company</p>
                    <p>Tesla Street 007</p>
                    <p>Frisco</p>
                    <p>CA 0000</p>
                  </div>

                  {/*  */}
                  <div className='text-md text-slate-500'>
                    <div>
                      <p className='font-bold text-slate-700'>Bill Number</p>
                      <p>{Math.random().toFixed(10)}</p>
                    </div>
                    <div>
                      <p className='font-bold text-slate-700 mt-2'>Date of issue</p>
                      <p>{customer && customer.createdAt.substring(0, 10)}</p>
                    </div>
                  </div>

                  {/*  */}

                  <div className='text-md text-slate-500 sm:block hidden'>
                    <div>
                      <p className='font-bold text-slate-700'>Terms</p>
                      <p>10 day</p>
                    </div>
                    <div>
                      <p className='font-bold text-slate-700 mt-2'>Due</p>
                      <p>2023.09.09</p>
                    </div>
                  </div>
                 
                </div>
              </div>
              {/* bill details */}

              <div className='bill-table-area'>
                <table className='min-w-full divide-y divide-slate-500 overflow-hidden'>
                <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col" className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden">
                      image
                    </th>
                    <th scope="col" className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden">
                      title
                    </th>
                    <th colSpan={4} scope="col" className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden">
                      title
                    </th>
                    <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      price
                    </th>
                    <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden">
                      amount
                    </th>
                    <th scope="col" className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0">
                      total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.items.map((item) => (

                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            subtotal {item.subtotal}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            subtotal {item.subtotal}$
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price.toFixed(2)}$</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity).toFixed(2)}$</span>
                      </td>
                    </tr>
                    ))}

                </tbody>
                  {/*  */}
                  <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        subtotal
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">subtotal</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subtotal}$
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">Tax</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Tax</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        {customer?.tax}$
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        total
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">total</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.amount}$
                      </span>
                    </th>
                  </tr>
                </tfoot>
                  {/*  */}
                </table>
                {/* table */}

                <div className="py-9">
                  <div className='border-t pt-9 border-slate-400'>
                    <p className='text-sm font-light text-slate-700'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum totam cupiditate iusto possimus laboriosam maxime quos architecto perspiciatis mollitia hic laborum, ipsa magni alias maiores laudantium odit nemo earum? Quo alias atque perspiciatis officia tempora incidunt, nulla adipisci natus beatae accusantium voluptas corporis illo est quia soluta repellendus voluptatem? In cum deserunt nam nihil! Nemo aspernatur dolor magni mollitia, maxime ipsa doloremque consectetur deleniti commodi perspiciatis nulla saepe dolorem illum neque, cupiditate sequi at nisi fugiat, labore dicta laudantium? Porro quos aut soluta quaerat. Consequuntur quos sint molestias explicabo illum neque dolor libero accusamus quibusdam, adipisci, voluptas, animi odit necessitatibus! </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <div className='flex justify-end mt-4'>
          <Button type="primary" size="large" onClick={handlePrint}>Print</Button>
        </div>
      </Modal>
    </>
  )
}

export default PrintBill;