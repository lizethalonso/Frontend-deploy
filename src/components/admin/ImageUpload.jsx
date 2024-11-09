import React, { useState, useEffect } from "react";

const ImageUpload = ({ onFilesAdded, existingImage }) => {
    const [files, setFiles] = useState({});

    const addFile = (file) => {
        const objectURL = URL.createObjectURL(file);
        setFiles((prevFiles) => ({
            ...prevFiles,
            [objectURL]: file,
        }));
        onFilesAdded(file); // Llama a la función para pasar los archivos al componente padre
    };

    const handleFileChange = (e) => {
        e.stopPropagation();
        for (const file of e.target.files) {
            addFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        for (const file of e.dataTransfer.files) {
            addFile(file);
        }
    };

    const handleDelete = (url) => {
        setFiles((prevFiles) => {
            const newFiles = { ...prevFiles };
            delete newFiles[url];
            return newFiles;
        });
    };

    useEffect(() => {
        // Cargar la imagen existente si hay una
        if (existingImage) {
            setFiles((prevFiles) => ({
                ...prevFiles,
                [existingImage]: { name: "Imagen existente", size: 0 }, // Cambiar a objeto
            }));
        }
    }, [existingImage]);

    return (
        <div
            className="mt-4 border-2 border-dashed border-gray-400 py-12 flex flex-col items-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()} // Prevenir el comportamiento predeterminado
            onClick={(e) => e.stopPropagation()} // Prevenir la propagación del click
        >
            <p className="mb-3 font-semibold text-gray-900">Arrastra y suelta tus archivos aquí o</p>
            <input
                id="hidden-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                onClick={(e) => e.stopPropagation()} // Prevenir la propagación del click
            />
            <button
                className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={(e) => {
                    e.preventDefault(); // Evitar cualquier comportamiento predeterminado
                    e.stopPropagation(); // Evitar el cierre del formulario
                    document.getElementById("hidden-input").click();
                }}
            >
                Cargar un archivo
            </button>
            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">Imágenes</h1>
            <ul className="flex flex-wrap m-1 w-full justify-center align-center gap-2">
                {Object.keys(files).length === 0 ? (
                    <li className="h-full w-full text-center flex flex-col items-center justify-center">
                        <img
                            className="mx-auto w-32"
                            src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                            alt="no data"
                        />
                        <span className="text-small text-gray-500">No hay archivos seleccionados</span>
                    </li>
                ) : (
                    Object.keys(files).map((url) => (
                        <li key={url} className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24 relative">
                            <article className="group w-full h-full rounded-md bg-gray-100 cursor-pointer relative shadow-sm">
                                <img
                                    alt="preview"
                                    className="img-preview w-full h-full object-cover rounded-md"
                                    src={url}
                                />
                                <button
                                    className="absolute top-1 right-1 focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-600 bg-gray-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(url);
                                    }}
                                >
                                    X
                                </button>
                            </article>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ImageUpload;
