import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Login() {
    //  aqui é para levou para home quando registar
    const navigate = useNavigate();

    // aqui é para pega o token e destribuir globalmente
    const { token, setToken } = useContext(AppContext);


    const [formData, setFormData] = useState({

        email: "",
        password: "",

    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "post",
            body: JSON.stringify(formData),
        });


        const data = await res.json();
        console.log(data);
        if (data.errors) {
            setErrors(data.errors);

        } else {
            console.log(localStorage.setItem('token', data.token));
            setToken(data.token);
            //  navigate("/");

        }



    }


    return (
        <>

            <h1 className="title">Login</h1>

            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">

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
                <button className="primary-btn">Login</button>
            </form>
        </>
    )
}