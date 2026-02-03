import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser, updateUser } from "../../api/apis.js";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function UserListing() {
  const { setActiveTab } = useOutletContext() || {};
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "user",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "user",
    });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "user",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // basic validation
    if (!editForm.firstName || !editForm.lastName || !editForm.email) {
      alert("First name, last name and email are required.");
      return;
    }

    try {
      // Do NOT send password from client — server will ignore password field if provided
      const updateData = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phone: editForm.phone,
        role: editForm.role,
      };
      await updateUser(userId, updateData, token);
      alert("User updated successfully");
      cancelEdit();
      await loadUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(err.response?.data || "Failed to update user");
      }
    }
  };

  const loadUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const data = await getAllUsers(token);
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setUsers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token");
      const result = await deleteUser(userId, token);
      if (result) {
        alert("User deleted successfully");
        await loadUsers();
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return fullName.includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">User Management</h2>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email"
            className="px-3 py-2 rounded-md border border-amber-100 bg-amber-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition"
          />

          <button
            onClick={loadUsers}
            className="px-3 py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 bg-amber-50 rounded-lg shadow-sm">
          <p className="text-amber-700">Loading users...</p>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-amber-100">
          <ul className="divide-y divide-amber-50">
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                className="px-4 py-4 hover:bg-amber-50 transition"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold flex-shrink-0">
                      {`${(user.firstName || "").charAt(0).toUpperCase()}${(user.lastName || "").charAt(0).toUpperCase()}`}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-slate-800 truncate">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "admin" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <p className="text-xs text-slate-400">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-600">
                  {user.phone || "—"}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => startEdit(user)}
                    className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-3 py-1 rounded-md bg-rose-50 text-rose-700 text-sm hover:bg-rose-100 transition"
                  >
                    Delete
                  </button>
                </div>

                <div
                  className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    editingUserId === user._id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {editingUserId === user._id && (
                    <form className="grid gap-2 sm:grid-cols-2 mt-2">
                      <input
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleEditChange}
                        placeholder="First name"
                        className="px-3 py-2 border rounded"
                      />

                      <input
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleEditChange}
                        placeholder="Last name"
                        className="px-3 py-2 border rounded"
                      />

                      <input
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        placeholder="Email"
                        className="px-3 py-2 border rounded col-span-2"
                      />

                      <input
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditChange}
                        placeholder="Phone"
                        className="px-3 py-2 border rounded"
                      />

                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleEditChange}
                        className="px-3 py-2 border rounded"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>

                      <div className="flex gap-2 justify-end col-span-2">
                        <button
                          type="button"
                          onClick={() => saveEdit(user._id)}
                          className="px-3 py-2 bg-green-600 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-3 py-2 bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
}
