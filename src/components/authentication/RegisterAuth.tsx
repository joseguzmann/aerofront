import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import config from "../../config/index.json";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const RegisterAuth = () => {
  const { register } = config;
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState<string>();
  //const [email, setEmail] = useState<string>();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const validateEmail = (input: any) => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (event: any) => {
    const newEmail = event.target.value;
    //setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className=" flex flex-col   justify-center items-center  h-screen ">
      <div>
        <div className="my-6">
          <TextField
            fullWidth
            // error={!isValidEmail}
            label={register.name}
            // onChange={handleEmailChange}
          />
        </div>
        <div className="my-6">
          <TextField
            fullWidth
            // error={!isValidEmail}
            label={register.age}
            // onChange={handleEmailChange}
          />
        </div>
        <div className="my-6">
          <TextField
            fullWidth
            // error={!isValidEmail}
            label={register.email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="my-6">
          <FormControl className="w-[100%]" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {register.password}
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
        <div className="my-6">
          <TextField
            fullWidth
            // error={!isValidEmail}
            label={register.re_pass}
            // onChange={handleEmailChange}
          />
        </div>
        <div>
          <Button
            // disabled={email && password ? false : true}
            // disabled={!(isValidEmail && isValidPassword)}
            style={{
              backgroundColor:
                isValidEmail && isValidPassword ? "#ED6C02" : "#FCA971",
              color: "white",
              width: "100%",
              marginTop: "25px",
              marginBottom: "25px",
            }}
            variant="contained"
            // onClick={handleOnSubmit}
          >
            <p>{register.buttonRegister}</p>
          </Button>
          {/* <Button onClick={signOutUser}>LOG OUT</Button> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterAuth;
