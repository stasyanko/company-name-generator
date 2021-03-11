import React from 'react';
import axios from 'axios';
import {Card, Col, Form, Row} from "react-bootstrap";

type companyName = {
    _id: string,
    value: string,
    industry: number,
};

type CompanyNameListState = {
    company_names: companyName[]
}

export class CompanyNameList extends React.Component<{}, CompanyNameListState> {
    componentDidMount() {

    }

    handleIndustryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const industry = Number(e.target.value);
        axios.get<companyName[]>('http://localhost:5000/company-name', {
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

        return <>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select your industry</Form.Label>
                <Form.Control as="select" custom onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleIndustryChange(e)}>
                    <option value="0">Gaming</option>
                    <option value="1">Art</option>
                </Form.Control>
            </Form.Group>
            <Row>
                {companyNameList}
            </Row>
        </>;
    }
}