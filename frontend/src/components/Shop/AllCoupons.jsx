import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [value, setValue] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true }).then(() => {
      toast.success("Coupon code deleted successfully!");
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !value) {
      toast.error("Please fill in required fields!");
      return;
    }
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        { name, minAmount, maxAmount, selectedProducts, value, shopId: seller._id },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Coupon Code", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Value", minWidth: 100, flex: 0.6 },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)} className="text-red-500">
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = coupons.map((item) => ({
    id: item._id,
    name: item.name,
    price: `${item.value} %`,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-8 pt-4 bg-white">
          {/* Header with Create Coupon Button */}
          <div className="w-full flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
              onClick={() => setOpen(true)}
            >
              Create Coupon Code
            </button>
          </div>

          {/* Data Table */}
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />

          {/* Coupon Modal */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
                <button className="absolute top-3 right-3" onClick={() => setOpen(false)}>
                  <RxCross1 size={24} className="text-gray-600 hover:text-black" />
                </button>

                <h2 className="text-xl font-semibold text-center mb-4">Create Coupon Code</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter coupon name"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Discount Percentage <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter discount percentage"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Min Amount</label>
                    <input
                      type="number"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter minimum amount"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Max Amount</label>
                    <input
                      type="number"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter maximum amount"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Selected Product</label>
                    <select
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Choose a product</option>
                      {products.map((product) => (
                        <option key={product.name} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                    >
                      Create Coupon
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
