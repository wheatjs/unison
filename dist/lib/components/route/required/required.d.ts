export declare class RouteRequired {
    verify(request: any, headers: any, body: any, queries: any): Array<any>;
    private headers(request, headers);
    private body(request, body);
    private queries(request, queries);
}
