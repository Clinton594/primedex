import React, { useState } from "react";
import Section from "../components/Section";
import Fieldset, { Row, Col, Card, Form, FormElement, Button, Container } from "../components/Fieldset";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import { defaultState, submitEndDate, submitTokenRate, toggleStatus } from "../libraries/adminEvents";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { Iresponse, IStore } from "../types";
import projectConfig from "../constants/project.config";
import { setEnddate, setMinMaxState, setRate, setStatus } from "../redux/contractReducer";
import { setToast } from "../redux/toastReducer";
import Toaster from "../components/Toaster";
import { num_format } from "../libraries/utils";
import Footer from "../components/Footer";
import { setMinMax } from "../libraries/adminEvents";

export default function Admin() {
  const [loading, toggleLoading] = useState(defaultState);
  const dispatch = useDispatch();
  const web3 = useWeb3React();
  const { contract } = useSelector((store: IStore) => store);

  const triggerToggleStatus = () => {
    toggleLoading({ ...loading, status: true }); //start loading circle
    toggleStatus(web3, ({ status, toast }: Iresponse) => {
      toast.status && dispatch(setStatus(status)); // update the reducer
      toggleLoading({ ...loading, status: false }); // stop the loading circle
      dispatch(setToast(toast)); //toast the response
    });
  };

  const triggerSetRate = (e: any) => {
    e.preventDefault();
    const val = e.target[0].value;

    toggleLoading({ ...loading, rate: true }); //start loading circle
    submitTokenRate(web3, val, ({ status, toast, data }: Iresponse) => {
      if (status) {
        dispatch(setRate(data));
        e.target[0].value = "";
      }
      toggleLoading({ ...loading, rate: false }); // stop the loading circle
      dispatch(setToast(toast)); //toast the response
    });
  };

  const triggerEnddate = (e: any) => {
    e.preventDefault();
    const val = e.target[0].value;

    toggleLoading({ ...loading, enddate: true }); //start loading circle
    submitEndDate(web3, val, ({ status, toast, data }: Iresponse) => {
      if (status) {
        dispatch(setEnddate(data));
        e.target[0].value = "";
      }
      toggleLoading({ ...loading, enddate: false }); // stop the loading circle
      dispatch(setToast(toast)); //toast the response
    });
  };

  const triggerWithdraw = (e: any) => {
    e.preventDefault();

    toggleLoading({ ...loading, withdraw: true }); //start loading circle
  };

  const triggerSetLimits = (e: any) => {
    e.preventDefault();
    const val = e.target[0].value;
    const val2 = e.target[1].value;

    toggleLoading({ ...loading, minmax: true }); //start loading circle
    setMinMax(web3, [val, val2], ({ status, toast, data }: Iresponse) => {
      if (status) {
        dispatch(setMinMaxState(data));
      }
      dispatch(setToast(toast)); //toast the response
      toggleLoading({ ...loading, minmax: false }); // stop the loading circle
    });
  };
  return (
    <>
      <main className="admin">
        <div
          style={{
            position: "fixed",
            background: "url(img/bg/p3.png) #212529",
            transition: "0.9s all",
          }}
          className="parallax no-parallax scrolly-invisible breathing"
        ></div>
        <Navbar />
        <Toaster />
        <div className="fsec">
          <Section>
            <Container>
              <Row>
                <>
                  <Col md="6">
                    <Card>
                      <Fieldset title="Status" value={contract.status ? "ON" : "OFF"} isLoading={loading.status}>
                        <Form>
                          <FormElement
                            name="status"
                            type="switch"
                            onChange={triggerToggleStatus}
                            checked={contract.status}
                            value=""
                            disabled={loading.status}
                            label={`Turn ${projectConfig.status[contract.status ? "OFF" : "ON"]} the presale`}
                          />
                        </Form>
                      </Fieldset>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card>
                      <Fieldset title="Rate" value={num_format(contract.rate)} isLoading={loading.rate}>
                        <Form onSubmit={triggerSetRate}>
                          <>
                            <FormElement
                              label="Enter the presale rate"
                              placeholder="Eg: 1000"
                              name="rate"
                              type="number"
                              value=""
                              disabled={loading.rate}
                              required={true}
                            />
                            <Button disabled={loading.rate} variant="danger" type="submit">
                              <>Submit {loading.rate && <Spinner animation="border" size="sm" variant="warning" />}</>
                            </Button>
                          </>
                        </Form>
                      </Fieldset>
                    </Card>
                  </Col>
                </>
              </Row>
            </Container>
          </Section>
          <Section>
            <Container>
              <Row>
                <Col md="6">
                  <Card>
                    <Fieldset title="Balance" value="---" isLoading={loading.withdraw}>
                      <Form onSubmit={triggerWithdraw}>
                        <>
                          <FormElement
                            label="Withdraw all available balance"
                            placeholder="Enter you ERC20 Address here"
                            name="withdraw"
                            type="input"
                            value=""
                            disabled={loading.withdraw}
                            required={true}
                          />
                          <Button disabled={loading.withdraw} variant="danger" type="submit">
                            <>
                              Withdraw {loading.withdraw && <Spinner animation="border" size="sm" variant="warning" />}
                            </>
                          </Button>
                        </>
                      </Form>
                    </Fieldset>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <Fieldset title="Presale Ends" value={contract.enddate} isLoading={loading.enddate}>
                      <Form onSubmit={triggerEnddate}>
                        <>
                          <FormElement
                            label="Update presale end date"
                            name="enddate"
                            type="date"
                            value=""
                            disabled={loading.enddate}
                            required={true}
                          />
                          <Button disabled={loading.enddate} variant="danger" type="submit">
                            <>Modify {loading.enddate && <Spinner animation="border" size="sm" variant="warning" />}</>
                          </Button>
                        </>
                      </Form>
                    </Fieldset>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Section>
          <Section>
            <Container>
              <Row>
                <Col md="6">
                  <Card>
                    <Fieldset
                      title="Limits"
                      value={`(${contract.minPurchase}) to (${contract.maxPurchase})`}
                      isLoading={loading.minmax}
                    >
                      <Form onSubmit={triggerSetLimits}>
                        <>
                          <FormElement
                            label="Min Purchase"
                            placeholder="Enter Min Purchase"
                            name="minvalue"
                            type="number"
                            value={contract.minPurchase}
                            disabled={loading.minmax}
                            required={true}
                            min={0.1}
                            step={0.1}
                          />
                          <FormElement
                            label="Max Purchase"
                            placeholder="Enter Min Purchase"
                            name="maxvalue"
                            type="number"
                            value={contract.maxPurchase}
                            disabled={loading.minmax}
                            required={true}
                            min={0.1}
                            step={0.1}
                          />
                          <Button disabled={loading.minmax} variant="danger" type="submit">
                            <>Set {loading.minmax && <Spinner animation="border" size="sm" variant="warning" />}</>
                          </Button>
                        </>
                      </Form>
                    </Fieldset>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Section>
        </div>
        <Footer />
      </main>
    </>
  );
}
