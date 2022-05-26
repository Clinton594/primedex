import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import Fieldset, { Row, Col, Card, Form, FormElement, Button, Container } from "../components/Fieldset";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

export default function Admin() {
  const loading = { status: true, rate: true, withdraw: true, enddate: true };
  const [zoom, zoomIn] = useState("shrink");
  useEffect(() => {
    setInterval(() => {
      zoomIn(zoom === "shrink" ? "expand" : "shrink");
    }, 1000);
  }, [zoom]);
  return (
    <>
      <main className="admin">
        <div
          style={{
            position: "fixed",
            background: "url(img/bg/p3.png) #212529",
            transition: "0.9s all",
            transform: `scale(${{ shrink: 1, expand: 1.04 }[zoom]})`,
          }}
          className="parallax no-parallax scrolly-invisible"
        ></div>
        <Navbar />
        <div className="fsec">
          <Section>
            <Container>
              <Row>
                <>
                  <Col md="6">
                    <Card>
                      <Fieldset title="Status" value={true} isLoading={loading.status}>
                        <Form>
                          <FormElement
                            name="status"
                            type="switch"
                            value=""
                            disabled={false}
                            label="Turn on the presale"
                          />
                        </Form>
                      </Fieldset>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card>
                      <Fieldset title="Rate" value="10,000" isLoading={loading.rate}>
                        <Form>
                          <>
                            <FormElement
                              label="Enter the presale rate"
                              placeholder="Eg: 1000"
                              name="rate"
                              type="number"
                              value=""
                              disabled={false}
                            />
                            <Button disabled={loading.rate} variant="danger" type="submit">
                              <>Withdraw {loading.rate && <Spinner animation="border" size="sm" variant="warning" />}</>
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
        </div>
        <Section>
          <Container>
            <Row>
              <Col md="6">
                <Card>
                  <Fieldset title="Balance" value="" isLoading={loading.withdraw}>
                    <Form>
                      <>
                        <FormElement
                          label="Withdraw all available balance"
                          placeholder="Enter you ERC20 Address here"
                          name="withdraw"
                          type="input"
                          value=""
                          disabled={false}
                        />
                        <Button disabled={loading.withdraw} variant="danger" type="submit">
                          <>Withdraw {loading.withdraw && <Spinner animation="border" size="sm" variant="warning" />}</>
                        </Button>
                      </>
                    </Form>
                  </Fieldset>
                </Card>
              </Col>
              <Col md="6">
                <Card>
                  <Fieldset title="Presale Ends" value="" isLoading={loading.enddate}>
                    <Form>
                      <>
                        <FormElement
                          label="Update presale end date"
                          name="enddate"
                          type="date"
                          value=""
                          disabled={false}
                        />
                        <Button disabled={loading.enddate} variant="danger" type="submit">
                          <>Withdraw {loading.enddate && <Spinner animation="border" size="sm" variant="warning" />}</>
                        </Button>
                      </>
                    </Form>
                  </Fieldset>
                </Card>
              </Col>
            </Row>
          </Container>
        </Section>
      </main>
    </>
  );
}
