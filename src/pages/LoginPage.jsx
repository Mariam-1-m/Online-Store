import LoginForm from "../components/Login/LoginForm.jsx";
import axios from "../lib/api.js"

export default function LoginPage() {
    const onSubmit = async (data) => {
      try{
    const res = await axios.post("/auth/login", data)
    console.log(res)
      }catch(err){
        console.log(err.response?.data)
      }

    }
  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
