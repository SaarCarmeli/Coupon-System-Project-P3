import { Typography } from "@mui/material";
import "./addCompany.css";
import { useEffect, useState } from 'react';

function AddCompany(): JSX.Element {
    // const [jwt, setJwt] = useState("");
    // useEffect(() => {
    //     setJwt(localStorage.getItem("jwt"));
    // });
    return (
        <div className="addCompany">
            <br/>
			<Typography variant="h4" align="center">Add new Company</Typography><hr/>
            {/*jwt*/}
        </div>
    );
}

export default AddCompany;
