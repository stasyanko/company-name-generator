import React from 'react';
import './App.css';
import {Container} from "react-bootstrap";
import {CompanyNameList} from "./components/CompanyNameList";

function App() {
    return (
        <Container fluid style={{paddingBottom: '20px'}}>
            <Container>
                <CompanyNameList/>
            </Container>
        </Container>
    );
}

export default App;
