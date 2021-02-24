import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/Actions'
import { Link, useHistory } from "react-router-dom";
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
    const emailRef = useRef('');
    const passwordRef = useRef('');

    useEffect(() => {
        setTitle("LogIn")
    }, []);

    useEffect(() => {
        $("#validPass").hide();
        $("#validMail").hide();
    }, []);


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
        const userLogin = { password: passwordRef.current.value, email: emailRef.current.value };

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
                        setId(res.data.myUser._id)
                        history.push("/Pictures");
                    } else
                        console.log("data is null")
                }
            }
            ,
            err => {
                console.log('error createUser: ' + err);
                return false;
            }
        )
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