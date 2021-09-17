import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            "https://weshopbd.herokuapp.com/user/infor",
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          setCart(res.data.user.cart);
          res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) {
      return toast.warn("Please Login or Registration to Continue Buying");
    }

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "https://weshopbd.herokuapp.com/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      toast.warn("This Product is Already Added in Cart");
    }
  };

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get(
            "https://weshopbd.herokuapp.com/api/order",
            {
              headers: { Authorization: token },
            }
          );
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, callback, isAdmin, setHistory]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback: [callback, setCallback],
  };
}

export default UserAPI;
