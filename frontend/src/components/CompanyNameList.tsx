import React from 'react';
import axios from 'axios';
import {Card, Col, Form, Row} from "react-bootstrap";
import {apiBaseUrl} from "../constants";

type companyName = {
    _id: string,
    value: string,
    industry: number,
};

type companyIndustryOption = {
    key: number,
    value: string,
};

type CompanyNameListState = {
    company_names: companyName[],
    company_industry_options: companyIndustryOption[],
}

export class CompanyNameList extends React.Component<{}, CompanyNameListState> {
    componentDidMount() {
        axios.get<companyIndustryOption[]>(apiBaseUrl + '/company-name/industry')
            .then((res) => {
                const emptyOption: companyIndustryOption = {
                    key: 0,
                    value: 'Please select an industry'
                };
                this.setState({
                    ...this.state,
                    ...{company_industry_options: [emptyOption, ...res.data]}
                });
            })
            .catch((error: Error) => {
                alert(error.message);
            });
    }

    handleIndustryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const industry = Number(e.target.value);
        axios.get<companyName[]>(apiBaseUrl + '/company-name', {
            params: {
                industry: industry
            }
        })
            .then((res) => {
                this.setState({
                    ...this.state,
                    ...{company_names: res.data}
                });
            })
            .catch((error: Error) => {
                alert(error.message);
            });
    }

    render() {
        const companyNameList = this.state?.company_names?.map((companyName: companyName) => {
            return <Col xs="12" sm="4" lg="3">
                <Card style={{marginTop: '8px', borderWidth: '2px'}} className={'text-center'}>
                    <Card.Body>{companyName.value}</Card.Body>
                </Card>
            </Col>
        });
        const companyIndustryOptions = this.state?.company_industry_options?.map((companyIndustryOption: companyIndustryOption) => {
            return <option value={companyIndustryOption.key}>{companyIndustryOption.value}</option>
        });

        return <>
            <Row className="justify-content-md-center">
                <Col md="8" className="text-center">
                    <h1>Select your industry and you will see awesome company names</h1>
                </Col>
                <Col xs="12" sm="6" lg="6">
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control as="select" custom
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleIndustryChange(e)}>
                            {companyIndustryOptions}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {companyNameList}
            </Row>
        </>;
    }
}