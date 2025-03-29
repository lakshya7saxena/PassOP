import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const ref1 = useRef()
  const ref2 = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const getPasswords = async () => {
    let data = await fetch("http://localhost:3000/")
    data = await data.json()
    setpasswordArray(data)
  }

  useEffect(() => {
    getPasswords()
  }, [])

  const handleClick = () => {
    if (ref1.current.src.includes('eye.png')) {
      ref1.current.src = 'icons/eyecross.png'
      ref2.current.type = 'text'
    } else {
      ref1.current.src = 'icons/eye.png'
      ref2.current.type = 'password'
    }
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (form.site == "" || form.username == "" || form.password == "") {
      alert("Please fill all the fields")
      return
    }
    toast('Saved Successfully!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (form.id) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: form.id })
      })
    }
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...form, id: uuidv4() })
    })
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    setform({ site: "", username: "", password: "" })
  }
  const handleCopy = (item) => {
    navigator.clipboard.writeText(item)
    toast('Copied to Clipboard!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const handleEdit = (item) => {
    setform(item)
    setpasswordArray(passwordArray.filter((i) => {
      return i.id != item.id
    }
    ))
  }
  const handleDelete = async (item) => {

    let c = confirm("Are you sure you want to delete this password?")
    if (c) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: item.id })
      })
      let data = await fetch("http://localhost:3000/")
      data = await data.json()

      setpasswordArray(data)
      toast('Deleted Successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute top-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] "></div>
      <div className="md:my-container px-4 md:px-32 flex flex-col items-center my-10 space-y-5 md:min-h-[73vh] h-[70vh] md:h-auto">
        <div className="title flex flex-col items-center space-y-1">
          <h1 className='text-3xl font-bold'><span className='color'>&lt;</span>Pass<span className='color'>OP/&gt;</span></h1>
          <p>Your Own Password Manager</p>
        </div>
        <div className="input w-full  space-y-5">
          <input type="text" name='site' value={form.site} onChange={handleChange} className='w-full  py-1 px-4 rounded-full border border-green-500 ' placeholder='Enter Website URL' />
          <div className='flex flex-col md:flex-row gap-5'>
            <input type="text" name='username' value={form.username} onChange={handleChange} className='rounded-full py-1 px-4  w-full border border-green-500' placeholder='Enter Username' />
            <div className='relative'>
              <input ref={ref2} type="password" value={form.password} onChange={handleChange} name='password' className='rounded-full py-1 px-4 w-full border border-green-500' placeholder='Enter Password' />
              <img ref={ref1} src="icons/eye.png" alt="" className='absolute w-5 top-2 right-3 cursor-pointer' onClick={handleClick} />
            </div>
          </div>
        </div>
        <button onClick={handleSave} className='rounded-full ring-2 hover:bg-green-400 hover:font-bold flex justify-center items-center py-2 gap-2 px-8 ring-green-700 bg-green-500'>
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover" >
          </lord-icon>Save</button>
        <div className="password-container w-full space-y-5 overflow-auto">
          <h1 className='text-2xl font-bold'>Your Passwords</h1>

          {passwordArray.length == 0 && <p className='text-center text-green-400 font-bold text-lg'>No Passwords Saved</p>}
          {passwordArray.length != 0 && <table className="w-full overflow-hidden rounded-lg text-sm">
            <thead>
              <tr>
                <th className='bg-green-500 p-2 text-white text-base md:text-lg'>Site</th>
                <th className='bg-green-500 p-2 text-white text-base md:text-lg'>Username</th>
                <th className='bg-green-500 p-2 text-white text-base md:text-lg'>Password</th>
                <th className='bg-green-500 p-2 text-white text-base md:text-lg'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className='text-center p-3 w-[30%]'>
                      <div className='flex justify-center items-center gap-1'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <lord-icon
                          style={{ padding: '4px', width: '25px', height: '25px', cursor: 'pointer' }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" onClick={() => handleCopy(item.site)} >
                        </lord-icon></div>
                    </td>
                    <td className='text-center p-3 w-[30%]'>
                      <div className='flex justify-center items-center gap-1'>
                        <div>{item.username}</div>
                        <lord-icon
                          style={{ padding: '4px', width: '25px', height: '25px', cursor: 'pointer' }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" onClick={() => handleCopy(item.username)} >
                        </lord-icon></div>
                    </td>
                    <td className='text-center p-3 w-[20%]'>
                      <div className='flex justify-center items-center gap-1'>
                        <div>{item.password}</div>
                        <lord-icon
                          style={{ padding: '4px', width: '25px', height: '25px', cursor: 'pointer' }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" onClick={() => handleCopy(item.password)} >
                        </lord-icon></div>
                    </td>
                    <td className='text-center p-3 w-[20%]'>
                      <div className='flex justify-center items-center gap-3'>
                        <div><lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px", cursor: 'pointer' }}
                          onClick={() => handleEdit(item)}>
                        </lord-icon></div>
                        <div><lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px", cursor: 'pointer' }}
                          onClick={() => handleDelete(item)}></lord-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>}



        </div>
      </div>

    </>
  )
}

export default Manager
