import { useContextGlobal } from "../utils/global.context"; // Adjust the import path if needed
import SubHeader from "../components/SubHeader";
import ProductTable from "../components/admin/ProductTable";
import Form from "../components/admin/Form";
import Message from "../components/admin/Message";
import IsMobile from "../components/admin/IsMobile";
import { useState } from "react"; // Ensure useState is imported

const Admin = () => {
    const { isMobile } = useContextGlobal(); // Get isMobile from context
    const [isCreatingProduct, setIsCreatingProduct] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddProduct = () => {
        setIsCreatingProduct(true);
    };

    const handleListProducts = () => {
        setIsCreatingProduct(false);
    };

    const buttons = {
        1: [
            {
                text: "Agregar producto",
                textColor: "primary",
                bgColor: "transparent",
                action: handleAddProduct,
            },
        ],
        2: [
            {
                text: "Lista de productos",
                textColor: "primary",
                bgColor: "transparent",
                action: handleListProducts,
            },
        ],
    };

    return (
        <>
            {isMobile ? (
                <IsMobile />
            ) : (
                <div className="min-h-screen pt-8 bg-black">
                    <SubHeader title={"Panel de Administración"} buttons={buttons} />
                    {isCreatingProduct ? (
                        <section className="py-24 bg-black h-full mx-24 mt-20">
                            <Form
                                edit={false}
                                onClose={handleListProducts}
                                setSuccessMessage={setSuccessMessage}
                                setErrorMessage={setErrorMessage}
                            />
                        </section>
                    ) : (
                        <ProductTable
                            setSuccessMessage={setSuccessMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    )}

                    {/* Success or error message */}
                    {successMessage && (
                        <div className="fixed bottom-4 right-4 z-50 mb-4">
                            <Message
                                type="success"
                                text={successMessage}
                                onClose={() => setSuccessMessage("")}
                            />
                        </div>
                    )}
                    {errorMessage && (
                        <div className="fixed bottom-4 right-4 z-50 mb-4">
                            <Message
                                type="danger"
                                text={errorMessage}
                                onClose={() => setErrorMessage("")}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Admin;
