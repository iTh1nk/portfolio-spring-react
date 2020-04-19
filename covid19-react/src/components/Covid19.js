import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  Collapse,
  Table,
  Spinner,
} from "reactstrap";
import dataIrvine from "../data/dataIrvine.json";
import dataOC from "../data/dataOC.json";
// import Moment from "react-moment";
// import moment from "moment";
// import usDate from "https://pomber.github.io/covid19/timeseries.json";
import Axios from "axios";
import SelectInt from "./SelectInt";
import { AssignContext } from "./AssignContext";

import toaster from "toasted-notes";

export default function Covid19() {
  const [dataUS, setDataUS] = useState([]);
  const [dataWorld, setDataWorld] = useState([]);
  const { toggleSearch, setToggleSearch, lanSwitch, lan } = useContext(
    AssignContext
  );

  useEffect(() => {
    // Axios.get("https://pomber.github.io/covid19/timeseries.json")
    //   .then((resp) => {
    //     setDataWorld(resp.data);
    //     setDataUS(resp.data.US.reverse());
    //     console.log(resp.data.US);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    Axios.get("/api/toaster")
      .then((resp) => {
        console.log("Get Toaster: ", resp.data);
        toaster.notify(
          <div style={{ fontWeight: "bold", color: "darkgreen" }}>
            {/* {lan.toasterNote[lanSwitch]} */}
            {/* {console.log("Typeof: " ,typeof resp.data[0])} */}
            {console.log(resp.data)}
            {typeof resp.data[0] === "undefined"
              ? lan.toasterNote[lanSwitch]
              : resp.data[0].content}
          </div>,
          {
            duration: 1000,
          }
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toaster.notify(
          <div style={{ fontWeight: "bold", color: "darkgreen" }}>
            {lan.toasterNote[lanSwitch]}
          </div>,
          {
            duration: 1000,
          }
        );
      });

    // toaster.notify(({ onClose }) => (
    //   <div>
    //     <span>My custom toaster</span>
    //     <Button
    //       color="primary"
    //       outline
    //       size="sm"
    //       onClick={onClose}
    //     >
    //       关闭
    //     </Button>
    //   </div>
    // ));
  }, []);

  const numNewUS = (arg1, arg2) => {
    return arg1 - arg2;
  };
  const numNewUSList = (num) => {
    if (num == dataUS.length - 1) {
      return dataUS[parseInt(num)].confirmed;
    } else {
      return (
        dataUS[parseInt(num)].confirmed - dataUS[parseInt(num) + 1].confirmed
      );
    }
  };
  const formatDate = (str) => {
    return str;
  };

  const computeNewIrvine = (num, index) => {
    console.log(num, index);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);
  const [isLoading, setIsLoading] = useState(true);

  const date = new Date();

  const Loading = () => {
    return (
      <div>
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="primary" />
      </div>
    );
  };

  const containerStyle = {
    marginTop: "1em",
    marginBottom: "1em",
  };

  const regionTitle = {
    color: "darkblue",
  };

  const numConfirmed = {
    color: "darkred",
  };
  const numNew = {
    color: "red",
  };
  const numDead = {
    color: "grey",
  };
  const dateStyle = {
    fontStyle: "italic",
    color: "darkblue",
  };
  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8em",
  };

  if (isLoading) {
    return (
      <>
        <div style={loadingStyle}>{lan.message.loading[lanSwitch]}</div>
        <div style={loadingStyle}>
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      <Container style={containerStyle}>
        <SelectInt data={dataWorld} toggle={toggleSearch} />

        {/* *********************************************************************************** */}
        {/* Card for Irvine */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>
              {lan.cardIrvine.title[lanSwitch]} ({dataIrvine[0].date})
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/admin");
                }}
              >
                .
              </span>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/login");
                }}
              >
                .
              </span>
            </h5>
          </CardHeader>
          <CardBody>
            <Table>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>
                    {lan.general.totalConfirmed[lanSwitch]}
                  </th>
                  <th style={numNew}>{lan.general.dailyNew[lanSwitch]}</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>{dataIrvine[0].confirmed}</td>
                  <td style={numNew}>
                    +
                    {dataIrvine.length === 1
                      ? 0
                      : dataIrvine[0].confirmed - dataIrvine[1].confirmed}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button
              color="primary"
              onClick={toggle}
              size="sm"
              style={{ marginBottom: "1rem" }}
            >
              {lan.general.cardBtn[lanSwitch]}
            </Button>

            {/* Toggle Content for Irvine */}
            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                  <Table borderless>
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th>{lan.general.date[lanSwitch]}</th>
                        <th style={numConfirmed}>
                          {lan.general.dayConfirmed[lanSwitch]}
                        </th>
                        <th style={numNew}>{lan.general.dayNew[lanSwitch]}</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {dataIrvine.map((item, index) => (
                        <tr key={index}>
                          <td style={dateStyle}>{item.date}</td>
                          <td style={numConfirmed}>{item.confirmed}</td>
                          <td style={numNew}>
                            +
                            {index === dataIrvine.length - 1
                              ? 0
                              : dataIrvine[index].confirmed -
                                dataIrvine[index + 1].confirmed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <br />
        {/* *********************************************************************************** */}
        {/* Card for OC */}
        <Card>
          <CardHeader>
            <h5 style={regionTitle}>
              {lan.cardOC.title[lanSwitch]}({dataOC[0].date}) (
              {lan.cardOC.icu[lanSwitch]}: {dataOC[0].icu})
            </h5>
          </CardHeader>
          <CardBody>
            <Table>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>
                    {lan.general.totalConfirmed[lanSwitch]}
                  </th>
                  <th style={numNew}>{lan.general.dailyNew[lanSwitch]}</th>
                  <th style={numDead}>{lan.general.totalDeaths[lanSwitch]}</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>{dataOC[0].confirmed}</td>
                  <td style={numNew}>+{dataOC[0].new}</td>
                  <td style={numDead}>{dataOC[0].deaths}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              color="primary"
              onClick={toggle1}
              size="sm"
              style={{ marginBottom: "1rem" }}
            >
              {lan.general.cardBtn[lanSwitch]}
            </Button>

            {/* Toggle Content for OC */}
            <Collapse isOpen={isOpen1}>
              <Card>
                <CardBody>
                  <Table borderless>
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th>{lan.general.date[lanSwitch]}</th>
                        <th style={numConfirmed}>
                          {lan.general.dayConfirmed[lanSwitch]}
                        </th>
                        <th style={numNew}>{lan.general.dayNew[lanSwitch]}</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {dataOC.map((item, index) => (
                        <tr key={index}>
                          <td style={dateStyle}>{item.date}</td>
                          <td style={numConfirmed}>{item.confirmed}</td>
                          <td style={numNew}>+{item.new}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Collapse>
          </CardBody>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <br />
        {/* *********************************************************************************** */}
        {/* Card for US */}
        {/* <Card>
          <CardHeader>
            <h5 style={regionTitle}>
              {lan.cardUS.title[lanSwitch]} ({dataUS[0].date})
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/admin");
                }}
              >
                .
              </span>
            </h5>
          </CardHeader>
          <CardBody>
            <Table>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={numConfirmed}>
                    {lan.general.totalConfirmed[lanSwitch]}
                  </th>
                  <th style={numNew}>{lan.general.dailyNew[lanSwitch]}</th>
                  <th style={numDead}>{lan.general.totalDeaths[lanSwitch]}</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={numConfirmed}>{dataUS[0].confirmed}</td>
                  <td style={numNew}>
                    +{numNewUS(dataUS[0].confirmed, dataUS[1].confirmed)}
                  </td>
                  <td style={numDead}>{dataUS[0].deaths}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              color="primary"
              onClick={toggle2}
              size="sm"
              style={{ marginBottom: "1rem" }}
            >
              {lan.general.cardBtn[lanSwitch]}
            </Button> */}

        {/* Toggle Content for US */}
        {/* <Collapse isOpen={isOpen2}>
              <Card>
                <CardBody>
                  <Table borderless>
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th>{lan.general.date[lanSwitch]}</th>
                        <th style={numConfirmed}>
                          {lan.general.dayConfirmed[lanSwitch]}
                        </th>
                        <th style={numNew}>{lan.general.dayNew[lanSwitch]}</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {dataUS.map((item, index) => (
                        <tr key={index}>
                          <td style={dateStyle}>{formatDate(item.date)}</td>
                          <td style={numConfirmed}>{item.confirmed}</td>
                          <td style={numNew}>+{numNewUSList(index)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Collapse>
          </CardBody>
        </Card> */}
      </Container>
    </>
  );
}
