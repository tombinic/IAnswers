import {useNavigate , Navigate} from "react-router-dom";
import {forwardRef} from "react";

const Basic = forwardRef(( { setAuth }) => {
    const infos = {success : false, email : "" , name : "" , surname : ""};
    localStorage.setItem('auth' , JSON.stringify(infos));
    setAuth(infos);

    return (<Navigate  to="/authentication/sign-in" /> );
});

export default Basic;
