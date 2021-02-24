import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/Actions'
import { createUser } from '../service'
import {
    Link
} from "react-router-dom";

function mapStateToProps(state) {
    return {
        content: state.appReducer.content
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTitle: (title) => dispatch(actions.setTitle(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(function RegistrationForm(props) {
    const { content, setTitle } = props;

    useEffect(() => {
        setTitle("Register")
    }, []);

    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const passwordConfirmRef = useRef('')
    const nameRef = useRef('')

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    function sendDetils() {
        if (emailRef.current.value != '' && passwordRef.current.value === passwordConfirmRef.current.value) {
            createUser({ email: emailRef.current.value, password: passwordRef.current.value, name: nameRef.current.value });
        }
        else {
            if (emailRef.current.value === '')
                console.log('email is null');
            else
                if (passwordRef.current.value != passwordConfirmRef.current.value)
                    console.log('passwords are not same....');

        }


    }



    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputName">Name</label>
                    <input className="form-control"
                        id="name"
                        ref={nameRef}
                        placeholder="Enter your name"
                        onChange={handleChange}
                    />

                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        ref={emailRef}
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        ref={passwordRef}
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                        ref={passwordConfirmRef}
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                    />
                </div>
                <button
                    type='submit'
                    className="btn btn-primary"
                    onClick={sendDetils}
                >
                    Register
          </button>
            </form>
            <span>Already have an account? <Link to="./">Login here</Link></span>
        </div>
    )
})
