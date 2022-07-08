import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Alert } from '@ui/Alert';


type previewStatusResponse= {
    preview: boolean,
    context: Json
} | null;

export function PreviewModeBanner() {
    const [isEnabled, setIsEnabled]= useState(false);

    useEffect(()=> {
        try {
            fetch("/api/preview/status")
                .then(response => response.json())
                .then((data: previewStatusResponse) => {
                    setIsEnabled(data?.preview || false );
                });
        } catch(e) {

        }
    },[])

    if(!isEnabled) {
        return null;
    }

    return(
        <div className="fixed right-0 bottom-16 w-md transform translate-x-2/3 hover:translate-x-0 z-10 transition-transform duration-300">
            <Alert variant="filled" severity="warning" action={
                <Button variant="text" color="inherit" href="/api/preview/exit">
                    Disable preview mode
                </Button>
            }>

                <div className="max-w-md">Preview mode is enabled</div>
            </Alert>
        </div>
    )
}