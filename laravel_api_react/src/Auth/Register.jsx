import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Register() {
    //  aqui é para levou para home quando registar
    const navigate = useNavigate();

    // aqui é para pega o token e destribuir globalmente
    const {token , setToken} = useContext(AppContext);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
  
    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch("/api/register", {
          method: "post",
          body: JSON.stringify(formData),
        });
    

        const data = await res.json();
        if(data.errors){
            setErrors(data.errors);
           
        }else{
           console.log(localStorage.setItem('token', data.token));
            setToken(data.token);
             navigate("/");
            console.log(data);
        }
      

     
    }


    return (
        <>

            <h1 className="title">Register PAGE</h1>
     
            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Name" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                         {errors.name && <p className="error">{errors.name[0]}</p>}
                </div>
                <div>
                    <input type="email" placeholder="Email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                              {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <input type="password" placeholder="password" value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                              {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <input   type="password" placeholder="Confirm Password" value={formData.password_confirmation}
                        onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} />
                    {errors.password_confirmation && <p className="error">{errors.password_confirmation[0]}</p>}
                </div>
                <button className="primary-btn">Register</button>
            </form>
        </>
    )
}