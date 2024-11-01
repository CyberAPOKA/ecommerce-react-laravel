import { useState } from "react";
import { Sidebar as Drawer } from "primereact/sidebar";
import { Button } from "primereact/button";

export default function Sidebar() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div className="hidden sm:flex">
                <button onClick={() => setVisible(true)}>
                    <i className="pi pi-align-justify text-4xl text-white"></i>
                </button>
                <Drawer visible={visible} onHide={() => setVisible(false)}>
                    teste
                </Drawer>
            </div>
        </>
    );
}
