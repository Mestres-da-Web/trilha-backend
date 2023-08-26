import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionService } from "../services/CreateSessionService";

class SessionController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const createSessionService = container.resolve(CreateSessionService);

        const user = await createSessionService.execute({
            email,
            password,
        });

        return response.status(200).send(user);
    }
}

export { SessionController };