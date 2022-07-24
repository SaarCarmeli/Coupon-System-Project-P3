import { Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../Models/Company";
import "./singleCompany.css";

interface SingleCompanyProps {
	company: Company
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {
    const navigate = useNavigate();
    const companyCouponList = () => {
        
    }

    return (
        <div className="singleCompany Box">
			<Typography variant="h2">{props.company.id}</Typography><hr/><br/>
            {props.company.name}<br/><br/>
            {props.company.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                <Button color="primary" onClick={companyCouponList}>Coupon List</Button>
            </ButtonGroup>
        </div>
    );
}

export default SingleCompany;
