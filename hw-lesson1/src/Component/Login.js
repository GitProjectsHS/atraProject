import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/Actions'
import { Link, useHistory } from "react-router-dom";
// import {signUp} from '../service'
import axios from 'axios'
import $ from 'jquery'


function mapStateToProps(state) {
    return {
        content: state.appReducer.content,
        user: state.userReducer.user
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTitle: (title) => dispatch(actions.setTitle(title)),
    setId: (userId) => dispatch(actions.setId(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
    const { content, setTitle, setId, user } = props;

    const history = useHistory();
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const [myUser, setMyUser] = useState('userStart')
    const emailRef = useRef('');
    const passwordRef = useRef('');

    useEffect(() => {
        setTitle("LogIn")
    }, []);

    useEffect(() => {
        setId(myUser)
    }, [myUser]);

    useEffect(() => {
        $("#validPass").hide();
        $("#validMail").hide();
    }, []);

    function updateID(id) {
        setId(id)
        console.log('fggfgfgf', user.userId)
    }

    const handleChange = (e) => {
        $("#validPass").hide();
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    async function Submit(e) {
        e.preventDefault()
        debugger
        console.log(user.userId + "setid userrrrrrrrrrr")
        //TO DO
        const userLogin = { password: passwordRef.current.value, email: emailRef.current.value };
        console.log("userLogin", userLogin)
        // export async function signUp(user) {
        debugger

        await axios.post('http://localhost:3500/login', userLogin).then(
            res => {
                console.log('signUP work ' + JSON.stringify(res.data));

                if (res.data) {
                    if (res.data === 'email or password is wrong') {
                        $("#validPass").show();
                    } else if (res.data === 'user not exist') {
                        $("#validMail").show();
                    }
                    if (res.data.myUser) {
                        debugger;
                        //updateID(res.data.myUser._id)
                        const id = res.data.myUser._id
                        // setMyUser(id);
                        // console.log('myUserrrrrrrrrrrr', user.userId, res.data.myUser._id, myUser)
                        setId(res.data.myUser._id)
                        console.log(content.title, "contentttt", user.userId + "user iddddddddddddddddddd")
                        console.log('dataaaaaaaaaaaaaaaaaaaaa', JSON.stringify(res.data.myUser._id));
                        history.push("/Pictures");
                    } else
                        console.log("data is null")
                    // return "data is null";
                }
            }
            ,
            err => {
                console.log('error createUser: ' + err);
                return false;
            }
        )
        // }


        //     const a= await signUp({ password: passwordRef.current.value, email: emailRef.current.value })
        //  debugger
        //     console.log('a',a)


        // גרוע לצמיתות :)console.log(signUp({ password: passwordRef.current.value, email: emailRef.current.value } + "submitttttt"))
        // if(await signUp({ password: passwordRef.current.value, email: emailRef.current.value }) === "user found")   
        // {
        //     <Redirect to='/Pictures'/>
        // }   
    }


    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        ref={emailRef}
                        onChange={handleChange}
                    />
                    <p id="validMail">User is not registered Please register first</p>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        ref={passwordRef}
                        onChange={handleChange}
                    />
                    <p id='validPass'>email or password is wrong</p>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={Submit}
                >
                    Submit
          </button>
            </form>
            <span>Dont have an account? <Link to="./Register">Register</Link></span>

        </div>
    )
})

 // const sendDetailsToServer = () => {
    //     if(state.email.length && state.password.length) {
    //         props.showError(null);
    //         const payload={
    //             "email":state.email,
    //             "password":state.password,
    //         }
    //         axios.post(process.nextTick.API_BASE_URL+'/user/register', payload)
    //             .then(function (response) {
    //                 if(response.status === 200){
    //                     setState(prevState => ({
    //                         ...prevState,
    //                         'successMessage' : 'Registration successful. Redirecting to home page..'
    //                     }))
    //                     redirectToHome();
    //                     props.showError(null)
    //                 } else{
    //                     props.showError("Some error ocurred");
    //                 }
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });    
    //     } else {
    //         props.showError('Please enter valid username and password')    
    //     }

    // }