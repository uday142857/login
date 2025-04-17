import React, { useState } from "react";
import "./Home.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  var [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://login-s7g3.onrender.com/userdata", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // if (res.data.ok) {

        // else{
        //   throw new Error("Invalid Token")

        // }
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  const removeuser = (id) => {
    axios
      .delete(`https://login-s7g3.onrender.com/removeuser/${id}`)
      .then(() => {
        axios
          .get("https://login-s7g3.onrender.com/userdata", {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          })
          .catch((err) => {
            console.log("error", err);
          });
      })
      .catch(() => {
        console.log("not deleted");
      });
  };
  return (
    <div>
      <div className="home">
        <h1>Home</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
          pariatur cum natus iure quia sequi voluptates animi similique quas
          praesentium placeat fuga laborum ab, nam earum. Veniam sit temporibus
          qui quia eum vitae voluptate corrupti nostrum nobis itaque ipsa totam
          fugiat veritatis voluptatem modi sed nesciunt autem quasi enim, cumque
          labore id iusto? Dicta accusamus est doloremque commodi, consequuntur
          illum porro quo perferendis, minus a eius nihil! Eveniet quod fugiat
          sed. Asperiores ipsa aliquam soluta officiis dolorum architecto fuga
          placeat repudiandae eius omnis pariatur alias, odit dignissimos maxime
          cupiditate quisquam voluptate aut ducimus modi eveniet distinctio
          corporis perferendis est fugit?
        </p>
        <button>submit</button>
      </div>
      <div className="tab">
        {data.length > 0 ? (
          <table rules="groups">
            <thead>
              <tr>
                <th>Name</th>
                <th>Password</th>
                <th>Phone no</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => {
                return (
                  <tr>
                    <td>{element.name}</td>
                    <td>{element.password}</td>
                    <td>{element.phno}</td>
                    <td className="but">
                      <Link to={`/update/${element._id}`}>
                        <button className="btn btn-primary">Update</button>
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeuser(element._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ color: "red", textAlign: "center" }}>
            <h3>NO User Found</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
