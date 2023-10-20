import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import React from 'react'

function Form() {

   const schema = yup.object().shape({
     fullName: yup.string().required("Your full name is required"),
     email: yup.string().email().required("Input a correct email"),
     age: yup.number().positive().integer().min(18).required(),
     password: yup.string().min(4).max(20).required("please input a valid password"),
     confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password Dont't match").required(),
   })

  const { register, handleSubmit, formState: { errors }} = useForm({
     resolver: yupResolver(schema),
    //will pass in a resolver
    //will install the resolver using npm install @hookform/resolvers
  });

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' placeholder='full name...' {...register("fullName")} />
       <p>{errors.fullName?.message}</p>
      <input type='text' placeholder='Email...'  {...register("email")}/>
      <p>{errors.email?.message}</p>
      <input type='number' placeholder='Age...'  {...register("age")} />
      <p>{errors.age?.message}</p>
      <input type='password' placeholder='Password...' {...register("password")} />
       <p>{errors.password?.message}</p>
      <input type='password' placeholder='Confirm Password...'  {...register("confirmPassword")} />
       <p>{errors.confirmPassword?.message}</p>
      <input type='submit' />
    </form>
  )
}  

export default Form