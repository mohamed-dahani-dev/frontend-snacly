import { useContext, useState } from "react";
import "./ResetPassword.css";
import axios from "axios";
import * as Yub from "yup";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [data, setData] = useState({
    password: "",
  });

  const [errorValidation, setErrorValidation] = useState("");

  // error validation style
  const errorValidationStyle = {
    marginBottom: "10px",
    color: "red",
    fontSize: "14px",
  };

  // validation
  const validationSchema = Yub.object({
    password: Yub.string()
      .min(6, "length must be at least 6 characters long")
      .required("The password is required"),
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const { url } = useContext(StoreContext);

  // use params hook used to get data from url
  const { userId, token } = useParams();

  const onLogin = async (event) => {
    event.preventDefault();

    // validation of inputs
    try {
      await validationSchema.validate(data, { abortEarly: false });
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
        setErrorValidation(newError);
      });
    }

    const response = await axios.post(
      `${url}/user/reset-password/${userId}/${token}`,
      data
    );

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <div className="reset-password">
      <form onSubmit={onLogin}>
        <div className="reset-password-title">
          <h2>Reset Password</h2>
        </div>
        <label>New password :</label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={data.password}
          placeholder="New password"
        />
        <p style={errorValidationStyle}>{errorValidation.password}</p>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
