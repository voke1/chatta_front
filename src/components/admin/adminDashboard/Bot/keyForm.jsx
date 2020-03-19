import React from "react";
import { MDBContainer, MDBInputGroup, MDBBtn } from "mdbreact";

class App extends React.Component {
    render() {
        return (
            <MDBContainer
            
            style={{width: "40%", align: "left"}}>
            
                

                <MDBInputGroup
                    material
                    containerClassName="mb-3 mt-0"
                    hint="Enter paytack key"
                    append={
                        <MDBBtn
                            color="secondary"
                            className="m-0 px-3 py-2 z-depth-0"
                        >
                            Apply 
            </MDBBtn>
                    }
                />

               
               
            </MDBContainer>
        );
    }
}

export default App;