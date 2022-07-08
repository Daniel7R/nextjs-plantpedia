import { NextPage } from "next";
import { Layout } from "@components/Layout";
import { Typography } from '@ui/Typography';
import { Button } from "@ui/Button";
import NotFoundPage from "./404";
import ServerError from "./500";


type ErrorPageProps= {
    statusCode?: number,
    message?: string
}

const ErrorPage: NextPage<ErrorPageProps>= ({statusCode, message}) => {
    if(statusCode === 404) {
        return (<NotFoundPage />)
    }

    if(typeof statusCode === "number" && statusCode > 500) {
        return <ServerError statusCode={500} />
    }

    let errorMessage= message;
    if(!message) {
        errorMessage= statusCode ? "An error ocurred on the server":
        "An error ocurred on the client"
    }

    return(
        <Layout>
            <div className="text-center">
                <Typography variant="h2" className="mb-6">
                    Dohh
                </Typography>
                <Typography variant="body1" className="mb-6">
                    {errorMessage}
                </Typography>
                {
                    statusCode && (
                        <Typography variant="body1" className="mb-6">
                            <span className="bg-gray-300 inline-block">
                                ERROR CODE: {statusCode}
                            </span>
                        </Typography>
                    )
                }
                <Button color="primary" variant="contained" href="/" title="Go back home">
                    Go back home
                </Button>
            </div>
        </Layout>
    )
}

ErrorPage.getInitialProps= ({res, err}) => {
    const statusCode= res? res.statusCode : err? err.statusCode: 404;

    return {
        statusCode
    }
}

export default ErrorPage;