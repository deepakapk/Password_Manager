import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  // The useRef hook in react is used to persist the value during the render toh yaha ho yeh raha hai ki agr hum use ref nahi use kar rahe hote toh har render par yeh apni image ki src phirse eye.png karleta
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async() => {  
    // Here we are making a post request to the server to get the passwords
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json() 
    setpasswordArray(passwords)
    console.log(passwords)
  }
  
  // We are using useEffect so that ki hum locastorage se apne saare passwords nikal le har render par

  useEffect(() => {
    getPasswords()
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async() => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length >3)
    {

      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})

      setpasswordArray([...passwordArray, {...form,id:uuidv4()}]);
      let res= await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
      // console.log([...passwordArray, form]);
      setform({site:"",username:"",password:""})
      toast("Password Saved!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
        toast("Error!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }
  };

  const deletePassword = async (id) => {
    console.log(`Delete password with id = ${id}`)
    let flag = confirm("Want to Delete!")
    if(flag === true){
      setpasswordArray(passwordArray.filter(i=>i.id !== id))
      console.log(form)
      let res = await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"}, body: JSON.stringify({id})})
      // localStorage.setItem("passwords",JSON.stringify([...filteredArray]))
      console.log("toasting")
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    
};
const editPassword = async(id) => {
    console.log(`Editing password with id = ${id}`)
    setform({...passwordArray.filter(i=>i.id === id)[0],id:id})
    const filteredArray = passwordArray.filter((item) => item.id !== id);
    setpasswordArray([...filteredArray])
    
  };

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="md:mycontainer overflow-auto min-h-[88.5vh]">
        <div className="logo font- text-4xl font-bold text-center">
          &lt;Pass
          <span className="text-green-500 ">OP/&gt;</span>
        </div>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className=" flex flex-col p-4 md:gap-8 items-center gap-4">
          <input
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
          />
          <div className="flex w-full flex-col md:flex-row justify-between md:gap-8 gap-4">
            <input
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                value={form.password}
                onChange={handleChange}
                name="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-black flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl md:py-4 py-1">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 py-2 border border-white ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="copyicon size-10 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <dotlottie-player
                              src="https://lottie.host/a103b7fd-e4f0-4216-bf24-ba4ae11df49c/hVVSe5zP9b.json"
                              background="transparent"
                              speed="1"
                              hover
                              autoplay
                            ></dotlottie-player>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="copyicon size-10 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <dotlottie-player
                              src="https://lottie.host/a103b7fd-e4f0-4216-bf24-ba4ae11df49c/hVVSe5zP9b.json"
                              background="transparent"
                              speed="1"
                              hover
                              autoplay
                            ></dotlottie-player>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="copyicon size-10 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <dotlottie-player
                              src="https://lottie.host/a103b7fd-e4f0-4216-bf24-ba4ae11df49c/hVVSe5zP9b.json"
                              background="transparent"
                              speed="1"
                              hover
                              autoplay
                            ></dotlottie-player>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <span className="mx-1 cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/ghhwiltn.json"
                            trigger="hover"
                            style={{width:"25px",height:"25px"}}
                          ></lord-icon>
                        </span>
                        <span className="mx-1 cursor-pointer" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
