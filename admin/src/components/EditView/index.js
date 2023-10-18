import React, { useEffect, useState } from "react";
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Button } from "@strapi/design-system/Button";
import MediaLib from "../MediaLib";
import mammoth  from "mammoth/mammoth.browser";

const MyCompo = () => {
    const { isCreatingEntry, initialData, modifiedData, onChange } = useCMEditViewDataManager();
    console.log(isCreatingEntry)
    //initialData.content = "asdfasdf";
    /*
    onChange({
        target: { name: "content", value: "new value" },
    });
    */

    const [mediaLibVisible, setMediaLibVisible] = useState(false);
    const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
    const handleChangeAssets = (assets) => {

        assets.map((asset) => {
            if (asset.mime.includes("word")) {
                fetch( asset.url)
                .then( r => r.arrayBuffer() )
                .then( buffer => { // note this is already an ArrayBuffer
                    mammoth.convertToHtml({arrayBuffer: buffer})
                    .then(function(result){
                        var html = result.value; // The generated HTML
                        var messages = result.messages; // Any messages, such as warnings during conversion
                        onChange({
                            target: { name: "content", value: html },
                        });
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
                });

              
            }
        });
        
        handleToggleMediaLib();
    };

  return (
    <>
        <Button
            variant="default"
            onClick={handleToggleMediaLib}
        >
            Select docx
        </Button>
        <MediaLib
            isOpen={mediaLibVisible}
            onChange={handleChangeAssets}
            onToggle={handleToggleMediaLib}
        />
     </>
  );
}
export default MyCompo;