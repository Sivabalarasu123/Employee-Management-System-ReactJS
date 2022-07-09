import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const UpdateEmployee = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [employee, setEmployee] = useState({
    id: id,
    firstName: '',
    lastName: '',
    email: '',
  })

  const handleChange = (e) => {
    const value = e.target.value
    setEmployee({ ...employee, [e.target.name]: value })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id)
        setEmployee(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const updateEmployee = (e, id) => {
    e.preventDefault()
    EmployeeService.updateEmployee(employee, id)
      .then((response) => {
        navigate('/employeeList')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex max-w-2xl shadow border-b mx-auto ">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update Employee</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            className="h-10 w-96 border mt-2 px-2 py-2"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            className="h-10 w-96 border mt-2 px-2 py-2"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            E-mail
          </label>
          <input
            type="email"
            className="h-10 w-96 border mt-2 px-2 py-2"
            name="email"
            value={employee.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            className="rounded text-white font-semibold bg-green-400 py-2 px-2 hover:bg-green-700"
            onClick={updateEmployee}
          >
            Update
          </button>

          <button
            className="rounded text-white font-semibold bg-red-400 py-2 px-2 hover:bg-red-700"
            onClick={() => navigate('/employeeList')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployee
