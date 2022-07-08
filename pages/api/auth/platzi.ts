import  type { NextApiHandler } from 'next';


const credetialsAuth: NextApiHandler= (request, response) => {

    if(request.method !== "POST") {
        response.status(405).end();
        return;
    }

    //validate credentials
    if(request.body.password === process.env.AUTH_PLATZI_SECRET) {
        const platziUser: User = {
            name: "Platzi Student",
            email: "student@student.com",
            image: ""
        }

        return response.status(200).json(platziUser);
    }

    response.status(401).end()
}

export default credetialsAuth;