import {
  useEffect,
  useState
} from 'react'

import {
  Trash2,
  UserPlus,
  ArrowLeft
} from 'lucide-react'

import {
  fetchUsers,
  createUser,
  deleteUser
} from '../services/api'

export default function Users({
  setActivePage
}) {

  const [users, setUsers] =
    useState([])

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
      role: 'Store Cashier'
    })

  useEffect(() => {

    loadUsers()

  }, [])

  const loadUsers =
    async () => {

      const data =
        await fetchUsers()

      setUsers(
        data.data || []
      )
    }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })
  }

  const addUser =
    async () => {

      if (
        !formData.name ||
        !formData.email ||
        !formData.password
      ) {

        alert(
          'Please fill all fields'
        )

        return
      }

      await createUser(
        formData
      )

      loadUsers()

      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Store Cashier'
      })
    }

  const removeUser =
    async (id) => {

      await deleteUser(id)

      loadUsers()
    }

  const getRoleColor = (
    role
  ) => {

    if (
      role ===
      'System Administrator'
    ) {

      return
        'bg-red-100 text-red-600'
    }

    if (
      role ===
      'Inventory Manager'
    ) {

      return
        'bg-blue-100 text-blue-600'
    }

    return
      'bg-green-100 text-green-600'
  }

  return (

    <div className="min-h-screen bg-slate-100 p-10">

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <button
          onClick={() =>
            setActivePage(
              'dashboard'
            )
          }
          className="mb-8 flex items-center gap-3 bg-slate-200 hover:bg-slate-300 transition px-5 py-3 rounded-2xl font-semibold"
        >

          <ArrowLeft size={22} />

          Back To Dashboard

        </button>

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              User Management

            </h1>

            <p className="text-slate-500 mt-2">

              Manage system users and RBAC roles

            </p>

          </div>

          <div className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold">

            RBAC Enabled

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-10">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter user name"
            className="border border-slate-300 p-4 rounded-2xl outline-none"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="border border-slate-300 p-4 rounded-2xl outline-none"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="border border-slate-300 p-4 rounded-2xl outline-none"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-slate-300 p-4 rounded-2xl outline-none"
          >

            

            <option>
              Inventory Manager
            </option>

            <option>
              Store Cashier
            </option>

          </select>

        </div>

        <button
          onClick={addUser}
          className="mb-10 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg"
        >

          <UserPlus size={22} />

          Add User

        </button>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-slate-600">

                <th className="text-left py-4">
                  User
                </th>

                <th className="text-left py-4">
                  Email
                </th>

                <th className="text-left py-4">
                  Role
                </th>

                <th className="text-left py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {

                users.map(user => (

                  <tr
                    key={user._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    <td className="py-5 font-semibold text-slate-700">

                      {user.name}

                    </td>

                    <td className="py-5 text-slate-500">

                      {user.email}

                    </td>

                    <td className="py-5">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getRoleColor(user.role)}`}
                      >

                        {user.role}

                      </span>

                    </td>

                    <td className="py-5">

                      <button
                        onClick={() =>
                          removeUser(
                            user._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 transition text-white p-3 rounded-xl"
                      >

                        <Trash2 size={18} />

                      </button>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}
