import { useState } from "react";
import Select from "react-select";
import api from "../api/axios";
import { useHistory } from "react-router-dom";

type RoleOption = {
  value: number;
  label: string;
};

const Forms = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    setAlertMessage(null);

    e.preventDefault();

    try {
      if (!fullName || !email || roles.length === 0) {
        setAlertMessage("Please fill in all fields");
        return;
      }

      const payload = {
        full_name: fullName,
        email,
        roles: roles.map((r) => r.value), // convert [{value,label}] → [1,3]
      };

      const res = await api.post("/users", payload);

      console.log("User created:", res.data);

      // redirect or clear form
      setFullName("");
      setEmail("");
      setRoles([]);
      setAlertMessage("User created successfully. Redirecting...");

      setTimeout(() => history.push("/"), 3000); // Clear message after 3 seconds
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setAlertMessage(err.response?.data?.message || "Failed to create user");
      // alert("Failed to create user");
    }
  };

  const options: RoleOption[] = [
    { value: 1, label: "Author" },
    { value: 2, label: "Editor" },
    { value: 3, label: "Subscriber" },
    { value: 4, label: "Administrator" },
  ];

  return (
    <div className="w-full max-w-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Add User</h3>

      <form className="w-md">
        <div className="mb-5">
          <label htmlFor="email" className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="full_name"
            className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            id="full_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="roles" className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Roles
          </label>
          <Select<RoleOption, true>
            required
            id="roles"
            value={roles}
            onChange={(selected) => setRoles(selected as any)}
            options={options}
            isMulti
            placeholder="Select roles..."
            unstyled
            classNames={{
              placeholder: () => "text-gray-500 text-start ps-2 text-sm font-medium",
              control: () =>
                "border border-gray-300 rounded-lg p-1 hover:border-blue-400 focus:ring-2 focus:ring-blue-500",
              multiValue: () => "bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md mr-1",
              multiValueLabel: () => "text-sm font-medium",
              multiValueRemove: () => "text-blue-600 hover:text-red-600 cursor-pointer ml-1",
              menu: () => "bg-gray-800 border border-gray-200 rounded-lg mt-1 shadow-lg z-50 text-sm",
              option: ({ isFocused, isSelected }) =>
                `px-3 py-2 cursor-pointer ${isFocused ? "bg-blue-500" : ""} ${isSelected ? "bg-blue-100 text-sm" : ""}`,
            }}
          />
        </div>

        {alertMessage && (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            {alertMessage}
          </div>
        )}

        <button
          onClick={handleSubmit}
          type="button"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create User
        </button>
      </form>
    </div>
  );
};
export default Forms;
