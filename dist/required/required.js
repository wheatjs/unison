"use strict";
class Required {
    verify(request, headers, body, queries) {
        let errors = [];
        let requiredHeaders = this.headers(request, headers);
        let requiredBody = this.body(request, body);
        let requiredQuery = this.queries(request, queries);
        for (let header of requiredHeaders)
            errors.push({ type: 'header', parameter: header, message: `Error: Missing Header: '${header}'` });
        for (let body of requiredBody)
            errors.push({ type: 'body', parameter: body, message: `Error: Missing Body Parameter: '${body}'` });
        for (let query of requiredQuery)
            errors.push({ type: 'query', parameter: query, message: `Error: Missing Query Parameter: '${query}'` });
        return errors;
    }
    headers(request, headers) {
        let required = [];
        if (headers !== undefined && headers.length > 0)
            for (let header of headers)
                if (request.header[header] === undefined)
                    required.push(header);
        return required;
    }
    body(request, body) {
        let required = [];
        if (body !== undefined && body.length > 0)
            for (let param of body)
                if (request.body[param] === undefined)
                    required.push(param);
        return required;
    }
    queries(request, queries) {
        let required = [];
        if (queries !== undefined && queries.length > 0)
            for (let query of queries)
                if (request.query[query] === undefined)
                    required.push(query);
        return required;
    }
}
exports.Required = Required;
