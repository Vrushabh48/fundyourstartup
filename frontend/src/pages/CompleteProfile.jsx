import React from "react";
import Heading from "../components/Heading";
import Inputfield from "../components/Inputfield";
import Button from "../components/Button";
import Title from "../components/Title";

export default function CompleteProfile(){
    

    return(
        <div>
            <div>
                <Heading title="Startup Dashboard"/>
            </div>
            <div>
                <p>Please Fill out the details below as required: </p>
            </div>
            <div>
                <h2>Basic Info</h2>
                <div>
                    <Title label={"Startup Name"}/>
                    <Inputfield placeholder="Startup Name"/>
                    <Title label={"Tagline or Slogan [if any]"}/>
                    <Inputfield placeholder="Tagline or Slogan [if any]"/>
                    <Title label={"Founders Name"}/>
                    <Inputfield placeholder="Founders Names"/>
                    <Title label={"Date Founded"}/>
                    <Inputfield placeholder="Date Founded"/>
                </div>
            </div>
            <div>
                <h2>Company Overview</h2>
                <div>
                <Inputfield placeholder="Industry Sector"/>
                <Inputfield placeholder="Company Description"/>
                <Inputfield placeholder="Location"/>
                <Inputfield placeholder="Company Stage"/>
                <Inputfield placeholder="Location"/>
                <Inputfield placeholder="Company Stage"/>

                </div>
            </div>
            <div>
                <h2>Product/Service Information</h2>
                <div>
                <Inputfield placeholder="Product/ Service Description"/>
                <Inputfield placeholder="Unique Selling Proposition [USP]"/>
                <Inputfield placeholder="Market Problem"/>
                <Inputfield placeholder="Target Market"/>
                <Inputfield placeholder="Metrics showing growth"/>
                </div>
            </div>
            <div>
                <h2>Financial Information:</h2>
                <div>
                <Inputfield placeholder="Funding Stage"/>
                <Inputfield placeholder="Total Funding Raised"/>
                <Inputfield placeholder="Revenue (if applicable)"/>
                <Inputfield placeholder="Burn Rate and Runway"/>
                <Inputfield placeholder="Company Valuation"/>
                </div>
            </div>
            <div>
                <h2>Contact Information:</h2>
                <div>
                <Inputfield placeholder="Company Email"/>
                </div>
            </div>
            <div>
                <Button title="Submit" />
            </div>
        </div>
    )
}