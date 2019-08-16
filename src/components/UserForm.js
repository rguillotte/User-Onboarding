import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({errors, touched, values, status}) => {

    const [users, setUsers] = useState ([]);
    console.log(users);

    useEffect(()=>{
        if (status) {
            setUsers([...users, status]) 
        }
    },[status, users]);


    return (
        <div className="user-form">
            <Form>
                <Field 
                    type="text"
                    name="name"
                    placeholder="Name"           
                />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field 
                    type="text"
                    name="email"
                    placeholder="Email"           
                />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field 
                    type="password"
                    name="password"
                    placeholder="Password"           
                />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <Field 
                    type="password"
                    name="passwordconfirm"
                    placeholder="Confirm Password"           
                />
                {touched.passwordconfirm && errors.passwordconfirm && (
                    <p className="error">{errors.passwordconfirm}</p>
                )}

                <label className="checkbox-container">
                 Terms of Service   
                <Field 
                    type="checkbox"
                    name="terms"
                    checked={values.terms}
               
                />
                <span className="checkmark" />
                {touched.terms && errors.terms && (
                    <p className="error">{errors.terms}</p>
                )}
                </label>


                <button type="submit">Submit</button>

                {users.map(user => (
                    <p key={user.id}>{user.name}</p>
                ))}


            </Form>

        </div>
    )
}

const formikHOC = withFormik({
    mapPropsToValues({name, email, password, passwordconfirm, terms}) {
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            passwordconfirm: passwordconfirm || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        passwordconfirm: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match"),
        terms: Yup.bool().oneOf([true], "Must agree to Terms of Service")
        
    }),
    handleSubmit(values, {setStatus, resetForm }) {
        axios.post("https://reqres.in/api/users", values)
        .then(res => {
            console.log(res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log(err));
    }


});

const UserFormWithFormik = formikHOC(UserForm);




export default UserFormWithFormik;