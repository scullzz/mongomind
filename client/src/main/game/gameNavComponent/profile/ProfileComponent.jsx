import React from 'react'
import {useSelector} from "react-redux"
import style from "./style.module.css"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
const ProfileComponent = () => {
  const info = useSelector((state)=> state.user.info);
  return (
    <div className={style.MainProfile}>
      <div className={style.ProfileBlock}>
        <AccountBoxIcon style={{fontSize:"100px", color: "beige"}}/>
        <p className={style.profileName}>{info.name}</p>
        <p className={style.profileLevel}>Level - {info.level}</p>
      </div>
    </div>
  )
}

export default ProfileComponent
