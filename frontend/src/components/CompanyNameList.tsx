import React from 'react';
import axios from 'axios';

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
        axios.get<companyName[]>('http://localhost:5000/company-name')
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
            return <li>{companyName.value}</li>
        });

        return <>
            {companyNameList}
        </>;
    }
}