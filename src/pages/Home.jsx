import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { Col, Row } from "antd";
import { Doctor } from "../components/Doctor";
import { BASE_URL } from "../utils/Helper";

export const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `${BASE_URL}/api/user/get-all-approved-doctors`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor, index) => (
          <Col span={8} xs={24} sm={24} lg={8} key={index}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};
