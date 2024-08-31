import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {useDispatch, useSelector} from "src/services/store";
import {getUserError, loginUserThunk} from "src/services/slices/userSlice";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const localStorageEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState(localStorageEmail);
  const [password, setPassword] = useState('');
  const errorText = useSelector(getUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    dispatch(
      loginUserThunk({
        email: email,
        password: password
      })
    );
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
