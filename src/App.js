import React, { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [date, setDate] = useState([]);
  const [change, setChange] = useState("Name");
  const [addUser, setAddUser] = useState([]);
  const [value, setValue] = useState();

  const getApi = async () => {
    try {
      const { data } = await axios(url);
      console.log(data.results[0]);
      setDate(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    setValue(`${name?.first} ${name?.last} `);
  }, [date]);

  const { name, dob, email, phone, picture, location, registered } = date;

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={picture?.large} alt="random user" className="user-img" />
          <p className="user-title">My {change} is</p>
          <p className="user-value">
            <div>{value}</div>
          </p>

          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              value={name}
              onClick={() => {
                setValue(`${name?.first} ${name?.last} `);
                setChange("Name");
              }}
            >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="email"
              value={email}
              onClick={() => {
                setValue(` ${email} `);
                setChange("Email");
              }}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="age"
              onClick={() => {
                setValue(` ${dob?.age} `);
                setChange("Age");
              }}
            >
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="street"
              onClick={() => {
                setValue(location?.city);
                setChange("Street");
              }}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onClick={() => {
                setValue(` ${phone} `);
                setChange("Phone");
              }}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onClick={() => {
                setValue(` ${email} `);
                setChange("Email");
              }}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getApi}>
              new user
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => setAddUser([...addUser, date])}
            >
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {addUser &&
                addUser.map((user) => {
                  return (
                    <tr className="body-tr">
                      <td>{user?.name?.first}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.dob?.age}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
