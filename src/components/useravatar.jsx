import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
import { logout } from "../redux/slices/authslice";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());

      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");

      navigate("/log-in");
    }
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-blue-600">
            <span className="text-white font-semibold">
              {getInitials(user?.name)}
            </span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
            <div className="p-4">

              <div className="mb-4 border-b pb-3">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <Menu.Item>
                <button
                  onClick={() => setOpen(true)}
                  className="flex w-full items-center rounded-md px-2 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  <FaUser className="mr-2" />
                  Profile
                </button>
              </Menu.Item>

              <Menu.Item>
                <button
                  onClick={() => setOpenPassword(true)}
                  className="flex w-full items-center rounded-md px-2 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  <FaUserLock className="mr-2" />
                  Change Password
                </button>
              </Menu.Item>

              <Menu.Item>
                <button
                  onClick={logoutHandler}
                  className="flex w-full items-center rounded-md px-2 py-2 text-base text-red-600 hover:bg-red-50"
                >
                  <IoLogOutOutline className="mr-2" />
                  Logout
                </button>
              </Menu.Item>

            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserAvatar;