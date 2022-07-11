export default function handleError(error, req, res, next) {
    if (error.type === "bad_Request")
        return res.status(400).send(error.message);
    if (error.type === "unauthorized")
        return res.status(401).send(error.message);
    if (error.type === "forbidden")
        return res.status(403).send(error.message);
    if (error.type === "not_Found")
        return res.status(404).send(error.message);
    if (error.type === "conflict")
        return res.status(409).send(error.message);
    if (error.type === "unprocessable_entity")
        return res.status(422).send(error.message);
    return res.status(500).send(error);
}
