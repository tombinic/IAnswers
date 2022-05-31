import { Navigate} from "react-router-dom";
import {forwardRef} from "react";

const Basic = forwardRef(( { setAuth },ref) => {
    const infos = {success : false, username : "", name : "", surname : "", motto: ""};
    localStorage.setItem('auth', JSON.stringify(infos));
    setAuth(infos);

    return (<Navigate  to="/authentication/sign-in" /> );
});

export default Basic;
