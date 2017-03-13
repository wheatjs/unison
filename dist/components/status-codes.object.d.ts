/**
 * Credit to http://www.restapitutorial.com/httpstatuscodes.html for HTTP status codes.
 */
export declare const Status: {
    Informational: {
        Continue: number;
        SwitchingProtocols: number;
        Processing: number;
    };
    Success: {
        OK: number;
        Created: number;
        Accepted: number;
        NonAuthoritativeInformation: number;
        NoContent: number;
        ResetContent: number;
        PartialContent: number;
        MultiStatus: number;
        AlreadyReported: number;
        ImUsed: number;
    };
    Redirection: {
        MultipleChoices: number;
        MovedPermanently: number;
        Found: number;
        SeeOther: number;
        NotModified: number;
        UseProxy: number;
        TemporaryRedirect: number;
        PermanentRedirect: number;
    };
    ClientError: {
        BadRequest: number;
        Unauthorized: number;
        PaymentRequired: number;
        Forbidden: number;
        NotFound: number;
        MethodNotAllowed: number;
        NotAcceptable: number;
        ProxyAuthenticationRequired: number;
        RequestTimeout: number;
        Conflict: number;
        Gone: number;
        LengthRequired: number;
        PreconditionFailed: number;
        RequestEntityTooLarge: number;
        RequestURITooLong: number;
        UnsupportedMediaType: number;
        RequestedRangeNotSatisfiable: number;
        ExpectationFailed: number;
        ImATeapot: number;
        EnhanceYourCalm: number;
        UnprocessableEntity: number;
        Locked: number;
        FailedDependency: number;
        UpgradeRequired: number;
        PreconditionRequired: number;
        TooManyRequests: number;
        RequestHeaderFieldsTooLarge: number;
        NoResponse: number;
        RetryWith: number;
        BlockedByWindowsParentalControls: number;
        UnavailableForLegalReasons: number;
        ClientClosedRequest: number;
    };
    ServerError: {
        InternalServerError: number;
        NotImplemented: number;
        BadGateway: number;
        ServiceUnavailable: number;
        GatewayTimeout: number;
        HTTPVersionNotSupported: number;
        VariantAlsoNegotiates: number;
        InsufficientStorage: number;
        LoopDetected: number;
        BandwidthLimitExceeded: number;
        NotExtended: number;
        NetworkAuthenticationRequired: number;
        NetworkReadTimeoutError: number;
        NetworkConnectTimeoutError: number;
    };
};
