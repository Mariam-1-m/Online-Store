import SignupForm from "../components/Signup/SignupForm.jsx";

export default function SignupPage() {
    const onSubmit = (data) => {
    console.log(data)
    }
  return (
    <>
      <SignupForm onSubmit={onSubmit}/>
    </>
  );
}
