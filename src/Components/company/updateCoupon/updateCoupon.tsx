import { Cancel } from "@mui/icons-material";
import { Typography, TextField, ButtonGroup, Button } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { SccMsg, ErrMsg } from "../../../util/notify";
import SingleCoupon from "../singleCoupon/singleCoupon";
import SearchIcon from "@mui/icons-material/Search";
import "./updateCoupon.css";
import { updateCoupon } from "../../../redux/couponState";
import store from "../../../redux/store";

function UpdateCoupon(): JSX.Element {
  const navigate = useNavigate();
  let [coupons, setCoupons] = useState<Coupon[]>([]);
  let [updateCoupon, setUpdateCoupon] = useState<Coupon>(new Coupon());
  let [couponId, setId] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Coupon>();

  useEffect(() => {
    store.subscribe(() => {
      setCoupons(store.getState().reducers.couponState.coupons);
    });
  });

  const getCoupon = () => {
    setUpdateCoupon(coupons.filter((item) => {
      return (item.id === couponId);
    }).shift());
  };

  const sendUpdate = (msg: Coupon) => {
    // msg.id = updateCompany.id;
    // msg.password = updateCompany.password;
    // msg.coupons = updateCompany.coupons;
    // if (msg.name == "") {
    //   msg.name = updateCompany.name;
    // }
    // if (msg.email == "") {
    //   msg.name = updateCompany.email;
    // }
    jwtAxios
      .put<Coupon>(globals.urls.companyUpdateCoupon, msg)
      .then((response) => {
        notify.success(SccMsg.COUPON_UPDATED);
      })
      .catch((err) => {
        console.log(err);
        notify.error(ErrMsg.LOGIN_ERROR);
      });
  };

  const searchId = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setId(value as unknown as number);
  };
  return (
    <div className="updateCoupon" dir="ltr">
      <>
        <Typography variant="h4" align="center">
          Update Coupon #{updateCoupon.id}
        </Typography>
        <hr />
        <br />
        <br />
        <TextField
          name="id"
          label="Coupon I.D. number"
          variant="outlined"
          className="TextBox"
          onChange={searchId}
          value={couponId}
        />
        <br />
        <br />
        <ButtonGroup variant="contained">
          <Button
            color="primary"
            onClick={getCoupon}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </ButtonGroup>
        <br />
        <br />
        {<SingleCoupon coupon={updateCoupon} />}
        <br />
        <br />
        <form onSubmit={handleSubmit(sendUpdate)}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("name")}
          />
          <br />
          <br />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("email")}
          />
          <br />
          <br />
          <ButtonGroup variant="contained" fullWidth>
            <Button type="submit" color="primary">
              Send Update
            </Button>
            <Button type="reset" color="warning" startIcon={<Cancel />}>
              Clear
            </Button>
          </ButtonGroup>
        </form>
      </>
    </div>
  );
}

export default UpdateCoupon;
