import React, { useState, useEffect, useContext } from "react";
import config from "../../config/index.json";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { signOutUser, userLogin } from "../../lib/firestore/auth.service";

const LoginAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  useEffect(() => {
    if (password) {
      setIsValidPassword(password.length >= 6);
    }
  }, [password]);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleEmailChange = (event: any) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const validateEmail = (input: any) => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (email && password) {
        const user = await userLogin(email, password);
        console.log("USER LOGIN:", user);
        // console.log("USER:", user);
        // setUser(user);
      }
    } catch (error: any) {
      console.log("ERROR LOGIN: ", error.message);
    }
  };
  const { login } = config;
  return (
    <div className="flex justify-center items-center  h-screen ">
      <div className="flex  ">
        <div className="">
          <img src={login.imgLogin} width={"731px"} height={"618px"} />
        </div>
        <div className="flex flex-col justify-center bg-[#FFF8E1] px-40 flex-grow">
          <p className="text-lg">{login.welcome}</p>
          <p className="font-bold text-2xl">{login.login}</p>

          <div className=" mx-5 ">
            <div className="my-6">
              <TextField
                fullWidth
                error={!isValidEmail}
                label={login.email}
                onChange={handleEmailChange}
              />
              {!isValidEmail && <p>Please enter a valid email address</p>}
            </div>
            <div className="mb-6">
              <FormControl className="w-[100%]" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {login.password}
                </InputLabel>
                <OutlinedInput
                  onChange={handlePasswordChange}
                  error={!isValidPassword}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <div className="flex justify-end">
              <p>{login.forgot}</p>
            </div>
            <div>
              <Button
                // disabled={email && password ? false : true}
                disabled={!(isValidEmail && isValidPassword)}
                style={{
                  backgroundColor:
                    isValidEmail && isValidPassword ? "#ED6C02" : "#FCA971",
                  color: "white",
                  width: "100%",
                  marginTop: "25px",
                  marginBottom: "25px",
                }}
                variant="contained"
                onClick={handleOnSubmit}
              >
                <p>{login.buttonLogin}</p>
              </Button>
              <Button onClick={signOutUser}>LOG OUT</Button>
            </div>
            <div className="flex justify-center">
              <p>
                {login.noAccount} <Link href={"/"}>{login.register}</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAuth;
