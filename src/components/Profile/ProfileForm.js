import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../Store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  
    const authCtx = useContext(AuthContext);
    const history = useHistory();

  const newPasswordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      history.replace('/');
    })
    console.log(enteredPassword);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} minLength="7" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
