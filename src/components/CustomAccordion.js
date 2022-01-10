import React from 'react'
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomAccordion = ({data,title,tabId}) => {
    return (
      <div>
        <Accordion.Item eventKey={tabId}>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>
            {Object.keys(data).forEach(function (key) {
                if(key !== 'location' || key !== 'users' || key !== 'branch' || key !== 'teams'){
                    
                }

            })}
          </Accordion.Body>
        </Accordion.Item>
      </div>
    );
}

export default CustomAccordion
