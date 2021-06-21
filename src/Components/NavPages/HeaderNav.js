import React, {useEffect, useState} from "react";
import Header from "@dhis2/d2-ui-header-bar"
import {getInstance} from "d2";



const HeaderNav = () => {

    const [D2, setD2] = useState();

    useEffect(() => {
        getInstance().then(d2 =>{
            setD2(d2);
        });
    }, []);

    return (
        <div>
            {D2 && <Header className="mb-5" d2={D2}/>}
        </div>
    )
}

export default HeaderNav;